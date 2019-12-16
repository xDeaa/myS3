import { Request, Response, NextFunction } from 'express'
import { ResponseData } from '../models'
import { UserService } from '../services'

export default class UserController {
    public static getUsers = async (
        _: Request,
        res: Response,
    ): Promise<void> => {
        const users = await UserService.getAllUsers()

        return new ResponseData(200, { users }).sendJson(res)
    }

    public static getUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const user = await UserService.getUser(req.params.uuid)

            return new ResponseData(200, { user }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }

    public static updateUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { nickname, email, password } = req.body
            const { user } = req.attributes

            if (nickname) {
                user.nickname = nickname
            }

            if (email) {
                user.email = email
            }

            if (password) {
                user.password = password
            }

            const userUpdate = await UserService.updateUser(user)
            return new ResponseData(200, { user: userUpdate }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }

    public static deleteUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            await UserService.deleteUser(req.attributes.user)
            return new ResponseData(200, {
                msg: 'Successfully deleted',
            }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }
}
