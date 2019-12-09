import UserController from '../controllers/UserController'
import { BaseRoute } from '../models'
import { UserValidation } from '../controllers/Validation'
import { handleError, checkUserExists } from '../middlewares/common'
import BucketRoutes from './Bucket'

class UserRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.use(
            '/:uuid/buckets',
            UserValidation.UserParameter,
            handleError,
            checkUserExists,
            BucketRoutes,
        )

        this.router.get('/', UserController.getUsers)

        this.router.get(
            '/:uuid',
            UserValidation.UserParameter,
            handleError,
            checkUserExists,
            UserController.getUser,
        )
        this.router.put(
            '/:uuid',
            UserValidation.Update,
            handleError,
            checkUserExists,
            UserController.updateUser,
        )
        this.router.delete(
            '/:uuid',
            UserValidation.UserParameter,
            handleError,
            checkUserExists,
            UserController.deleteUser,
        )
    }
}

export default new UserRoutes().router
