import { Request, Response, NextFunction } from 'express'
import { ResponseData } from '../models'
import { BlobService } from '../services'
import { Blob } from '../entities'
import { NoFileException } from '../models/Exception'
import { copyFileSync, unlinkSync, readdirSync } from 'fs'
import path from 'path'

export default class BlobController {
    public static getBlobs = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const blobs: Blob[] = await BlobService.getBlobs(
                req.attributes.bucket,
            )

            return new ResponseData(200, { blobs }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }

    public static getBlob = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const blob: Blob = await BlobService.getBlob(
                req.attributes.bucket,
                parseInt(req.params.blobId),
            )

            return new ResponseData(200, { blob }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }

    public static getBlobMetadata = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { size, path } = await BlobService.getBlob(
                req.attributes.bucket,
                parseInt(req.params.blobId),
            )

            return new ResponseData(200, {
                blob: { metadata: { size, path } },
            }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }

    public static downloadBlob = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { getFullPath } = await BlobService.getBlob(
                req.attributes.bucket,
                parseInt(req.params.blobId),
            )
            return res.download(getFullPath())
        } catch (e) {
            next(e)
        }
    }

    public static createBlob = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            if (!req.file) {
                return next(new NoFileException())
            }

            const { filename, destination, size } = req.file
            const newBlob: Blob = new Blob()
            newBlob.name = filename
            newBlob.path = destination
            newBlob.size = size
            newBlob.bucket = req.attributes.bucket

            const blob: Blob = await BlobService.saveBlob(newBlob)

            return new ResponseData(200, { blob }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }

    public static duplicateBlob = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { blob } = req.attributes

            let duplicateBlob: Blob = blob.duplicate()
            duplicateBlob.bucket = req.attributes.bucket

            const ext = path.extname(blob.name)
            const name = path.basename(blob.name, ext)
            const nbFile = BlobController.countBlobFile(name, ext, blob.path)
            const nameDuplicate = `${name}.COPY.${nbFile + 1}${ext}`

            duplicateBlob.name = nameDuplicate

            copyFileSync(blob.getFullPath(), duplicateBlob.getFullPath())
            duplicateBlob = await BlobService.saveBlob(duplicateBlob)

            return new ResponseData(200, { blob: duplicateBlob }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }

    private static countBlobFile = (
        name: string,
        ext: string,
        path: string,
    ): number => {
        try {
            const files = readdirSync(path)
            const regex = new RegExp(`${name}(.COPY.([0-9]+))?${ext}`)

            let currentMaxCopy = 0
            files.forEach(file => {
                const match = file.match(regex)

                if (match && match.length > 0) {
                    const copyCount = match[2] ? parseInt(match[2]) : 0
                    if (copyCount > currentMaxCopy) {
                        currentMaxCopy = copyCount
                    }
                }
            })

            return currentMaxCopy
        } catch (_) {
            return 0
        }
    }

    public static deleteBlob = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { blob } = req.attributes
            unlinkSync(blob.getFullPath())

            await BlobService.deleteBlob(blob)

            return new ResponseData(200, {
                msg: 'Successfully deleted',
            }).sendJson(res)
        } catch (e) {
            next(e)
        }
    }
}
