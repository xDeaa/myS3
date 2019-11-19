import UserController from '../controllers/UserController'
import { BaseRoute } from '../models'
import { UserValidation } from '../controllers/Validation/UserValidation'

class UserRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.get('/', UserController.getUsers)
        this.router.get(
            '/:uuid',
            UserValidation.UserParameter,
            UserController.getUser,
        )
        this.router.put(
            '/:uuid',
            UserValidation.Update,
            UserController.updateUser,
        )
        this.router.delete(
            '/:uuid',
            UserValidation.UserParameter,
            UserController.deleteUser,
        )
    }
}

export default new UserRoutes().router
