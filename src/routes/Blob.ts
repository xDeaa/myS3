import BlobController from '../controllers/BlobController'
import { BaseRoute } from '../models'
import { BlobValidation } from '../controllers/Validation'
import { handleError, checkBlobExists } from '../middlewares/common'
import path from 'path'
import multer from 'multer'
import { existsSync, mkdirSync } from 'fs'

const storage = multer.diskStorage({
    async destination(req, file, cb) {
        const { uuid } = req.attributes.user
        const { name } = req.attributes.bucket

        const { STORAGE_PATH = '' } = process.env

        const pathName = path.join(STORAGE_PATH, uuid, name)

        try {
            if (!existsSync(pathName)) {
                mkdirSync(pathName, {
                    recursive: true,
                })
            }
        } catch (err) {
            console.error(err)
        }

        cb(null, pathName)
    },
    filename(req, file, cb) {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })

class BlobRoutes extends BaseRoute {
    public initializeRoutes(): void {
        // Get all blobs
        this.router.get('/', BlobController.getBlobs)

        // Get blob file data
        this.router.get(
            '/:blobId',
            BlobValidation.BlobParameter,
            handleError,
            checkBlobExists,
            BlobController.getBlob,
        )

        // Get metadata of a blob (path, size)
        this.router.get(
            '/:blobId/meta',
            BlobValidation.BlobParameter,
            handleError,
            checkBlobExists,
            BlobController.getBlobMetadata,
        )

        // Download blob file
        this.router.get(
            '/:blobId/download',
            BlobValidation.BlobParameter,
            handleError,
            checkBlobExists,
            BlobController.downloadBlob,
        )

        // Duplicate a blob (filename.copy.ext)
        this.router.post(
            '/:blobId/duplicate',
            BlobValidation.BlobParameter,
            handleError,
            checkBlobExists,
            BlobController.duplicateBlob,
        )

        // Upload and create a new blob
        this.router.post('/', upload.single('blob'), BlobController.createBlob)

        // Delete a blob
        this.router.delete(
            '/:blobId',
            BlobValidation.BlobParameter,
            handleError,
            checkBlobExists,
            BlobController.deleteBlob,
        )
    }
}

export default new BlobRoutes().router
