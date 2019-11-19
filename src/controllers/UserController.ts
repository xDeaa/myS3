import { Request, Response } from 'express'
import { hash } from 'bcrypt'
import { ResponseData } from '../models'
import { UserService } from '../services'

export default class UserController {
    public static getUsers = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        const users = await UserService.getAllUsers()

        return new ResponseData(200, { users }).sendJson(res)
    }

    public static getUser = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        const user = await UserService.getUser(req.params.uuid)

        return new ResponseData(200, { user }).sendJson(res)
    }

    public static createUser = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        const { nickname, email, password } = req.body
        const cryptedPass = await hash(password, 10)
        const user = await UserService.saveUser(nickname, email, cryptedPass)

        return new ResponseData(200, { user }).sendJson(res)
    }

    public static updateUser = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        return new ResponseData(200, {
            users: req.query.uuid,
        }).sendJson(res)
    }

    public static deleteUser = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        return new ResponseData(200, {
            users: req.query.uuid,
        }).sendJson(res)
    }
}
