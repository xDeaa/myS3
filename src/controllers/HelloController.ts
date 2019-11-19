import { NextFunction, Request, Response } from 'express'
import { ResponseData } from './../models'
import { Validation } from './Validation/Validation'

export default class HelloController {
    public static getHello = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const { err } = Validation.Data(req)
        if (err) {
            return next(err)
        }

        return new ResponseData(200, {
            hello: req.query.name,
        }).sendJson(res)
    }
}
