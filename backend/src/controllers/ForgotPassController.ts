import { Request, Response, NextFunction } from 'express'
import { ResponseData } from '../models'
import { ForgotPassService, UserService, MailService } from '../services'
import { UserNotExistsException, ForgotPassTokenNotExistsException } from '../models/Exception'
import { hashPassword } from '../utils/Utils'

export default class ForgotPassController {
    public static checkForgotToken = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { token } = req.query;
            const forgotPass = await ForgotPassService.findForgotToken(token)
            if (!forgotPass) {
                throw new ForgotPassTokenNotExistsException()
            }
            return new ResponseData(200, { isValid: true }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }

    public static createForgotPassword = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { email } = req.body;
            const user = await UserService.getUserEmail(email);
            if (!user) {
                throw new UserNotExistsException()
            }
            const forgotPass = await ForgotPassService.createForgot(user)
            const emailSended = await MailService.sendUserForgotPassword(user, forgotPass);
            return new ResponseData(200, { emailSended }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }

    public static updatePassword = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { token, password } = req.body;
            const forgotPass = await ForgotPassService.findForgotToken(token)

            if (!forgotPass) {
                throw new ForgotPassTokenNotExistsException()
            }

            const userToUpdate = forgotPass.user
            userToUpdate.password = await hashPassword(password)

            const userUpdated = await UserService.updateUser(userToUpdate)
            await MailService.sendUserPasswordUpdated(userUpdated);

            await ForgotPassService.deleteForgot(forgotPass.id)
            return new ResponseData(200, { isOk: true}).sendJson(res)
        } catch (e) {
            next(e)
        }
    }
}
