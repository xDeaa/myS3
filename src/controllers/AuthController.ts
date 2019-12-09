import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { ResponseData } from '../models'
import { UserService, MailService } from '../services'
import { verifiyPassword, hashPassword } from '../utils/Utils'
import { EmailOrPasswordWrongException } from '../models/Exception'

export default class AuthController {
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

            const user = await UserService.getUserEmail(email)
            const isPasswordOk = await verifiyPassword(password, user.password)
            if (!isPasswordOk) {
                throw new EmailOrPasswordWrongException()
            }

            const rawUser = {
                uuid: user.uuid,
                email: user.email,
                nickname: user.nickname,
            }

            const token = jwt.sign(
                { uuid: user.uuid, password: user.password },
                'secretKey',
            )

            return new ResponseData(200, { ...rawUser, token }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }
}