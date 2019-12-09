import BucketController from '../controllers/BucketController'
import { BaseRoute } from '../models'
import { BlobValidation } from '../controllers/Validation'
import { handleError } from '../middlewares/common'

class BlobRoutes extends BaseRoute {
    public initializeRoutes(): void {
        // TODO: BlobController
        // Get all blobs
        this.router.get('/', BucketController.getBuckets)

        // TODO: BlobController
        // Get blob file
        this.router.get('/:blobId', BucketController.getBuckets)

        // TODO: BlobController
        // Get metadata of a blob (path, size)
        this.router.get('/:blobId/meta', BucketController.getBuckets)

        // TODO: BlobController
        // Duplicate a blob (filename.copy.ext)
        this.router.post(
            '/:blobId/duplicate',
            BucketController.createBucket,
        )

        // TODO: BlobController
        // Add a new blob
        this.router.post(
            '/',
            BucketController.createBucket,
        )

        // TODO: BlobController  
        // Delete a blob     
        this.router.delete(
            '/:blobId',
            BlobValidation.BlobParameter,
            handleError,
            BucketController.deleteBucket,
        )
    }
}

export default new BlobRoutes().router
