import UserController from '../controllers/UserController'
import { BaseRoute } from '../models'
import { UserValidation } from '../controllers/Validation/UserValidation'
import { AuthValidation } from '../controllers/Validation/AuthValidation'

class UserRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.get('/', AuthValidation.Connected, UserController.getUser)

        this.router.get(
            '/:uuid',
            AuthValidation.Connected,
            UserValidation.UserParameter,
            UserController.getUser,
        )

        this.router.post('/', UserValidation.Create, UserController.getUser)

        this.router.put(
            '/:uuid',
            AuthValidation.Connected,
            UserValidation.Update,
            UserController.getUser,
        )

        this.router.delete(
            '/:uuid',
            AuthValidation.Connected,
            UserValidation.UserParameter,
            UserController.getUser,
        )
    }
}

export default new UserRoutes().router
