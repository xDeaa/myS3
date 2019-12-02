import BucketController from '../controllers/BucketController'
import { BaseRoute } from '../models'
import { UserValidation, BucketValidation } from '../controllers/Validation'
import { handleError } from '../middlewares/common'

class BucketRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.get(
            '/:uuid',
            UserValidation.UserParameter,
            handleError,
            BucketController.getObjects,
        )

        this.router.post(
            '/:uuid',
            BucketValidation.FieldsNecessary,
            handleError,
            BucketController.createBucket,
        )
        this.router.put(
            '/:uuid',
            BucketValidation.FieldsNecessary,
            handleError,
            BucketController.updateBucket,
        )
        this.router.delete(
            '/:uuid',
            BucketValidation.FieldsNecessary,
            handleError,
            BucketController.deleteBucket,
        )
    }
}

export default new BucketRoutes().router
