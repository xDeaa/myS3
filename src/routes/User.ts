import UserController from '../controllers/UserController'
import { BaseRoute } from '../models'
import { UserValidation } from '../controllers/Validation/UserValidation'
import { handleError } from '../middlewares/common'

class UserRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.get('/', UserController.getUsers)
        this.router.get(
            '/:uuid',
            UserValidation.UserParameter,
            handleError,
            UserController.getUser,
        )
        this.router.put(
            '/:uuid',
            UserValidation.Update,
            handleError,
            UserController.updateUser,
        )
        this.router.delete(
            '/:uuid',
            UserValidation.UserParameter,
            handleError,
            UserController.deleteUser,
        )
    }
}

export default new UserRoutes().router
