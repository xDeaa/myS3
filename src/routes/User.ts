import UserController from '../controllers/UserController'
import { BaseRoute } from '../models'
import { UserValidation } from '../controllers/Validation/UserValidation'
import { AuthValidation } from '../controllers/Validation/AuthValidation'

class UserRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.get('/', AuthValidation.Connected, UserController.getUsers)
        this.router.get(
            '/:uuid',
            AuthValidation.Connected,
            UserValidation.UserParameter,
            UserController.getUser,
        )
        this.router.post('/', UserValidation.Create, UserController.createUser)
        this.router.put(
            '/:uuid',
            AuthValidation.Connected,
            UserValidation.Update,
            UserController.updateUser,
        )
        this.router.delete(
            '/:uuid',
            AuthValidation.Connected,
            UserValidation.UserParameter,
            UserController.deleteUser,
        )
    }
}

export default new UserRoutes().router
