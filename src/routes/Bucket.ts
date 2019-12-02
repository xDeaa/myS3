import UserController from '../controllers/UserController'
import { BaseRoute } from '../models'
import { UserValidation, BucketValidation } from '../controllers/Validation'
import { handleError } from '../middlewares/common'

class BucketRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.get(
            '/:uuid',
            UserValidation.UserParameter,
            handleError,
            UserController.getUser,
        )
        this.router.put(
            '/:uuid',
            BucketValidation.FieldsNecessary,
            handleError,
            UserController.updateUser,
        )
        this.router.delete(
            '/:uuid',
            BucketValidation.FieldsNecessary,
            handleError,
            UserController.deleteUser,
        )
    }
}

export default new BucketRoutes().router
