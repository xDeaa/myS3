import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { ResponseData } from '../models'
import { UserService, MailService } from '../services'
import { verifiyPassword, hashPassword } from '../utils/Utils'
import { EmailOrPasswordWrongException } from '../models/Exception'
import { User } from '../entities'

export default class AuthController {
    public static createUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const { nickname, email, password } = req.body
        const cryptedPass = await hashPassword(password)
        try {
            const user: User = await UserService.saveUser(
                nickname,
                email,
                cryptedPass,
            )
            const rawUser: Object = {
                uuid: user.uuid,
                email: user.email,
                nickname: user.nickname,
            }

            const token: string = jwt.sign(
                { uuid: user.uuid, password: user.password },
                'secretKey',
            )
            await MailService.sendEmail()

            return new ResponseData(200, { ...rawUser, token }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }

    public static loginUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { email, password } = req.body

            const user: User = await UserService.getUserEmail(email)
            const isPasswordOk: Boolean = await verifiyPassword(
                password,
                user.password,
            )
            if (!isPasswordOk) {
                throw new EmailOrPasswordWrongException()
            }

            const rawUser: Object = {
                uuid: user.uuid,
                email: user.email,
                nickname: user.nickname,
            }

            const token: string = jwt.sign(
                { uuid: user.uuid, password: user.password },
                'secretKey',
            )

            return new ResponseData(200, { ...rawUser, token }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }
}
