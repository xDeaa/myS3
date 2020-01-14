import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { ResponseData } from '../models'
import { UserService, MailService } from '../services'
import { verifiyPassword, hashPassword } from '../utils/Utils'
import { EmailOrPasswordWrongException } from '../models/Exception'
import { User } from '../entities'
import uuid from 'uuid'

export default class AuthController {
    public static createUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { nickname, email, password } = req.body

            const cryptedPass = await hashPassword(password)

            const newUser: User = new User()
            newUser.uuid = uuid.v4()
            newUser.nickname = nickname
            newUser.email = email
            newUser.password = cryptedPass

            const user: User = await UserService.saveUser(newUser)

            const rawUser = AuthController.getRawUser(user)

            const token: string = jwt.sign(
                { uuid: user.uuid, password: user.password },
                'secretKey',
            )
            await MailService.sendUserEmailCreation(user.nickname, user.email)

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
            if (!user) {
                throw new EmailOrPasswordWrongException()
            }
            const isPasswordOk = await verifiyPassword(password, user.password)
            if (!isPasswordOk) {
                throw new EmailOrPasswordWrongException()
            }

            const rawUser = AuthController.getRawUser(user)

            const token: string = jwt.sign(
                { uuid: user.uuid, password: user.password },
                'secretKey',
            )

            return new ResponseData(200, { ...rawUser, token }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }

    private static getRawUser(user: User): Record<string, string> {
        const rawUser: Record<string, string> = {
            uuid: user.uuid,
            email: user.email,
            nickname: user.nickname,
        }

        return rawUser
    }
}
