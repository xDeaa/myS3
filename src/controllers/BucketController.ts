import { Request, Response, NextFunction } from 'express'
import { ResponseData } from '../models'
import { BucketService } from '../services'

export default class BucketController {
    public static getBuckets = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { uuid } = req.params
            const buckets: BucketService = await BucketService.getBuckets(uuid)

            return new ResponseData(200, { buckets }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }

    public static checkBucket = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { uuid, id } = req.params
            const bucket: BucketService = await BucketService.isBucketExists(
                uuid,
                parseInt(id),
            )

            return new ResponseData(!bucket ? 400 : 200).sendJson(res)
        } catch (e) {
            next(e)
        }
    }

    public static createBucket = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { name } = req.body
            const { uuid } = req.params
            const bucket: BucketService = await BucketService.saveBucket(
                name,
                uuid,
            )

            return new ResponseData(200, { bucket }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }

    public static updateBucket = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params
            const { name } = req.body
            const bucket: BucketService = await BucketService.updateBucket(
                parseInt(id),
                name,
            )
            return new ResponseData(200, { bucket }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }

    public static deleteBucket = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params
            await BucketService.deleteBucket(parseInt(id))

            return new ResponseData(200, {
                msg: 'Successfully deleted',
            }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }
}
