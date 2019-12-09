import { BaseRoute } from '../models'
import { UserValidation } from '../controllers/Validation'
import AuthController from '../controllers/AuthController'
import { handleError, checkUserExists } from '../middlewares/common'

class AuthRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.post(
            '/login',
            UserValidation.Create,
            handleError,
            AuthController.loginUser,
        )
        this.router.post(
            '/register',
            UserValidation.Create,
            handleError,
            AuthController.createUser,
        )
    }
}

export default new AuthRoutes().router
