import parser from 'body-parser'
import compression from 'compression'
import { Router, NextFunction, Request, Response } from 'express'
import { Validation } from '../controllers/Validation/Validation'

export const handleBodyRequestParsing = (router: Router): void => {
    router.use(parser.urlencoded({ extended: true }))
    router.use(parser.json())
}

export const handleCompression = (router: Router): void => {
    router.use(compression())
}

export const handleError = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    const { err } = Validation.Data(req)
    if (err) {
        return next(err)
    }
    next()
}
