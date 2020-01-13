import BucketController from '../controllers/BucketController'
import { BaseRoute } from '../models'
import { BucketValidation } from '../controllers/Validation'
import { handleError, checkBucketExists } from '../middlewares/common'
import BlobRoutes from './Blob'

class BucketRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.get('/', BucketController.getBuckets)

        this.router.post(
            '/',
            BucketValidation.FieldsNecessary,
            handleError,
            BucketController.createBucket,
        )

        this.router.head(
            '/:id',
            BucketValidation.BucketParameter,
            handleError,
            BucketController.checkBucket,
        )

        this.router.put(
            '/:id',
            BucketValidation.UpdateParameter,
            handleError,
            checkBucketExists,
            BucketController.updateBucket,
        )
        
        this.router.delete(
            '/:id',
            BucketValidation.BucketParameter,
            handleError,
            checkBucketExists,
            BucketController.deleteBucket,
        )

        this.router.use(
            '/:id/blobs',
            BucketValidation.BucketParameter,
            handleError,
            checkBucketExists,
            BlobRoutes,
        )
    }
}

export default new BucketRoutes().router
