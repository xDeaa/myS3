import UserController from '../controllers/UserController'
import { BaseRoute } from '../models'
import { UserValidation } from '../controllers/Validation/UserValidation'
import { AuthValidation } from '../controllers/Validation/AuthValidation'
import { handleError } from '../middlewares/common'

class UserRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.get('/', AuthValidation.Connected, UserController.getUsers)
        this.router.get(
            '/:uuid',
            AuthValidation.Connected,
            UserValidation.UserParameter,
            handleError,
            UserController.getUser,
        )
        this.router.post(
            '/',
            UserValidation.Create,
            handleError,
            UserController.createUser,
        )
        this.router.put(
            '/:uuid',
            AuthValidation.Connected,
            UserValidation.Update,
            handleError,
            UserController.updateUser,
        )
        this.router.delete(
            '/:uuid',
            AuthValidation.Connected,
            UserValidation.UserParameter,
            handleError,
            UserController.deleteUser,
        )
    }
}

export default new UserRoutes().router
