import { BaseRoute } from '../models'
import { UserValidation } from '../controllers/Validation/UserValidation'
import UserController from '../controllers/UserController'

class AuthRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.post('/login')
        this.router.post(
            '/register',
            UserValidation.Create,
            UserController.createUser,
        )
    }
}

export default new AuthRoutes().router
