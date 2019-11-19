import { NextFunction, Request, Response } from 'express'
import { ResponseData } from '../models'
import { Validation } from './Validation/Validation'

export default class UserController {
    public static getUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const { err } = Validation.Data(req)
        if (err) {
            return next(err)
        }

        return new ResponseData(200, {
            hello: req.query.uuid,
        }).sendJson(res)
    }
}
