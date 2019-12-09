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

            const rawUser: Record<string, any> = AuthController.getRawUser(user)

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
            const isPasswordOk: boolean = await verifiyPassword(
                password,
                user.password,
            )
            if (!isPasswordOk) {
                throw new EmailOrPasswordWrongException()
            }

            const rawUser: Record<
                string,
                string | number
            > = AuthController.getRawUser(user)

            const token: string = jwt.sign(
                { uuid: user.uuid, password: user.password },
                'secretKey',
            )

            return new ResponseData(200, { ...rawUser, token }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }

    private static getRawUser(user: User): Record<string, any> {
        const rawUser: Record<string, any> = {
            uuid: user.uuid,
            email: user.email,
            nickname: user.nickname,
        }

        return rawUser
    }
}
