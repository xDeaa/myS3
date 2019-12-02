import { Request, Response } from 'express'
import { ResponseData } from '../models'
import { UserService, BucketService } from '../services'

export default class UserController {
    public static getObjects = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        const users = await UserService.getAllUsers()

        return new ResponseData(200, { users }).sendJson(res)
    }

    public static getUser = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        const user = await UserService.getUser(req.params.uuid)

        return new ResponseData(200, { user }).sendJson(res)
    }

    public static createBucket = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        const { name, user } = req.body
        const bucker = await BucketService.saveBucket(name, user)

        return new ResponseData(200, { bucker }).sendJson(res)
    }

    public static updateBucket = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        return new ResponseData(200, {
            users: req.query.uuid,
        }).sendJson(res)
    }

    public static deleteBucket = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        return new ResponseData(200, {
            users: req.query.uuid,
        }).sendJson(res)
    }
}
