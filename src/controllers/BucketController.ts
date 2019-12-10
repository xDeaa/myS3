import { Request, Response, NextFunction } from 'express'
import { ResponseData } from '../models'
import { BucketService } from '../services'
import { Bucket } from '../entities'

export default class BucketController {
    public static getBuckets = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const buckets: Bucket[] = await BucketService.getBuckets(
                req.attributes.user,
            )

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
            const isBucket = await BucketService.isBucketExists(
                req.attributes.user,
                parseInt(req.params.id),
            )

            return new ResponseData(isBucket ? 200 : 400).sendJson(res)
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
            const newBucket: Bucket = new Bucket()
            newBucket.name = req.body.name
            newBucket.user = req.attributes.user

            const bucket: BucketService = await BucketService.saveBucket(
                newBucket,
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
            const { bucket } = req.attributes
            bucket.name = req.body.name
            const bucketUpdate: BucketService = await BucketService.updateBucket(
                bucket,
            )

            return new ResponseData(200, { bucket: bucketUpdate }).sendJson(res)
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
            await BucketService.deleteBucket(req.attributes.bucket)

            return new ResponseData(200, {
                msg: 'Successfully deleted',
            }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }
}
