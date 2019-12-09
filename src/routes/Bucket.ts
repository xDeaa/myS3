import BucketController from '../controllers/BucketController'
import { BaseRoute } from '../models'
import { UserValidation, BucketValidation } from '../controllers/Validation'
import { handleError } from '../middlewares/common'

class BucketRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.head(
            '/:id',
            BucketValidation.BucketParameter,
            handleError,
            BucketController.checkBucket,
        )

        this.router.get('/', BucketController.getBuckets)

        this.router.post(
            '/',
            BucketValidation.FieldsNecessary,
            handleError,
            BucketController.createBucket,
        )
        this.router.put(
            '/:id',
            BucketValidation.UpdateParameter,
            handleError,
            BucketController.updateBucket,
        )
        this.router.delete(
            '/:id',
            BucketValidation.BucketParameter,
            handleError,
            BucketController.deleteBucket,
        )
    }
}

export default new BucketRoutes().router
