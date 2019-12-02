import jwt from 'jsonwebtoken'
import e, { Request, Response, NextFunction } from 'express'
import { ResponseData } from '../models'
import { UserService, MailService } from '../services'
import { hashPassword } from '../utils/Utils'

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

    public static createUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const { nickname, email, password } = req.body
        const cryptedPass = await hashPassword(password)
        try {
            const user = await UserService.saveUser(
                nickname,
                email,
                cryptedPass,
            )
            const rawUser = {
                uuid: user.uuid,
                email: user.email,
                nickname: user.nickname,
            }

            const token = jwt.sign(
                { ...rawUser, password: user.password },
                'secretKey',
            )
            await MailService.sendEmail()

            return new ResponseData(200, { ...rawUser, token }).sendJson(res)
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
            const user = await UserService.updateUser(
                req.params.uuid,
                nickname,
                email,
                password,
            )
            return new ResponseData(200, { user }).sendJson(res)
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
            await UserService.deleteUser(req.params.uuid)
            return new ResponseData(200, {}).sendJson(res)
        } catch (e) {
            next(e)
        }
    }
}
