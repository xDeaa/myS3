import Logger from './../controllers/Logger'
import parser from 'body-parser'
import compression from 'compression'
import { Router, NextFunction, Request, Response } from 'express'
import { Validation } from '../controllers/Validation'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import { User } from '../entities'
import { UserService, BucketService, BlobService } from '../services'
import { AppAttributes } from '../models'
import {
    UnAuthorizedException,
    AlreadyConnectedException,
} from '../models/Exception'

export const handleBaseMiddleware = (router: Router): void => {
    router.use(cors())
    // Handle body request parsing
    router.use(parser.urlencoded({ extended: true }), parser.json())

    // Handle compression
    router.use(compression())

    // Handle app attributes initialization
    router.use((req: Request, _: Response, next: NextFunction) => {
        try {
            req.attributes = {} as AppAttributes
            next()
        } catch (e) {
            next(e)
        }
    })
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
    if (user.password !== payload.password) return false

    return true
}

export const handleAuth = async (
    req: Request,
    _: Response,
    next: NextFunction,
): Promise<void> => {
    if (!req.headers.authorization) {
        return next(new UnAuthorizedException())
    }

    try {
        const decoded: string | object = jwt.verify(
            req.headers.authorization,
            'secretKey',
        )

        const isValidPayload: boolean = await checkJwtPayload(decoded)
        if (!isValidPayload) {
            return next(new UnAuthorizedException())
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
        next(new AlreadyConnectedException())
    } else {
        next()
    }
}

export const checkUserExists = async (
    req: Request,
    _: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        // Call getUser, will throw an exception if not exists
        const user: User = await UserService.getUser(req.params.uuid)
        req.attributes.user = user
        next()
    } catch (e) {
        next(e)
    }
}

export const checkBucketExists = async (
    req: Request,
    _: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const bucket = await BucketService.getBucket(
            req.attributes.user,
            parseInt(req.params.id),
        )
        req.attributes.bucket = bucket
        next()
    } catch (e) {
        next(e)
    }
}

export const checkBlobExists = async (
    req: Request,
    _: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const blob = await BlobService.getBlob(
            req.attributes.bucket,
            parseInt(req.params.blobId),
        )
        req.attributes.blob = blob
        next()
    } catch (e) {
        next(e)
    }
}
