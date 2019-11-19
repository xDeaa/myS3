import { Logger } from './../controllers/Logger'
import parser from 'body-parser'
import compression from 'compression'
import { Router, NextFunction, Request, Response } from 'express'
import { Validation } from '../controllers/Validation/Validation'
import jwt from 'jsonwebtoken'
import { User } from '../entities'
import { UserService } from '../services'
import { ResponseError } from '../models'

export const handleBodyRequestParsing = (router: Router): void => {
    router.use(parser.urlencoded({ extended: true }))
    router.use(parser.json())
}

export const handleCompression = (router: Router): void => {
    router.use(compression())
}

export const handleError = async (
    req: Request,
    _: Response,
    next: NextFunction,
): Promise<void> => {
    const { err } = Validation.Data(req)
    if (err) {
        return next(err)
    }
    next()
}
const checkJwtPayload = async (
    decodedPayload: string | object,
): Promise<boolean> => {
    if (typeof decodedPayload === 'string') {
        return false
    }
    const payload = decodedPayload as User
    const user: User | null = await UserService.getUser(payload.uuid)

    if (!user) return false
    if (user.email !== payload.email) return false
    if (user.password !== payload.password) return false
    if (user.nickname !== payload.nickname) return false

    return true
}

export const handleAuth = async (
    req: Request,
    _: Response,
    next: NextFunction,
): Promise<void> => {
    if (!req.headers.authorization) {
        return next(
            new ResponseError(
                401,
                'unauthorized',
                'You must provide Authorization header !',
            ),
        )
    }

    try {
        const decoded = jwt.verify(req.headers.authorization, 'secretKey')

        const isValidPayload = await checkJwtPayload(decoded)
        if (!isValidPayload) {
            return next(
                new ResponseError(
                    401,
                    'unauthorized',
                    'Authorization token payload is invalid !',
                ),
            )
        }
    } catch (e) {
        Logger.errorLog(e)
        if (e instanceof Error) {
            next(e.message)
        } else {
            next(e)
        }
        return
    }
    next()
}

export const handleNotAuth = (
    req: Request,
    _: Response,
    next: NextFunction,
): void => {
    if (req.headers.authorization) {
        next(
            new ResponseError(
                400,
                'user_connected',
                'Header Authorization must be empty',
            ),
        )
    } else {
        next()
    }
}
