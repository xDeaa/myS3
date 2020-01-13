import { Request, Response, NextFunction } from 'express'
import { ResponseData } from '../models'
import { ForgetPassService, UserService, MailService } from '../services'
import { UserNotExistsException, ForgetPassTokenNotExistsException } from '../models/Exception'
import { hashPassword } from '../utils/Utils'

export default class ForgetPassController {
    public static checkForgetToken = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { token } = req.query;
            const forgetPass = await ForgetPassService.findForgetToken(token)
            if (!forgetPass) {
                throw new ForgetPassTokenNotExistsException()
            }
            return new ResponseData(200, { isValid: true }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }

    public static createForgetPassword = async (
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
            const forgetPass = await ForgetPassService.createForget(user)
            const emailSended = await MailService.sendUserForgetPassword(user, forgetPass);
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
            const forgetPass = await ForgetPassService.findForgetToken(token)

            if (!forgetPass) {
                throw new ForgetPassTokenNotExistsException()
            }

            const userToUpdate = forgetPass.user
            userToUpdate.password = await hashPassword(password)

            const userUpdated = await UserService.updateUser(userToUpdate)
            await MailService.sendUserPasswordUpdated(userUpdated);

            await ForgetPassService.deleteForget(forgetPass.id)
            return new ResponseData(200, { isOk: true}).sendJson(res)
        } catch (e) {
            next(e)
        }
    }
}
