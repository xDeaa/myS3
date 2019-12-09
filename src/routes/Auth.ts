import { BaseRoute } from '../models'
import { AuthValidation } from '../controllers/Validation'
import AuthController from '../controllers/AuthController'
import { handleError } from '../middlewares/common'

class AuthRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.post(
            '/login',
            AuthValidation.Login,
            handleError,
            AuthController.loginUser,
        )
        this.router.post(
            '/register',
            AuthValidation.Create,
            handleError,
            AuthController.createUser,
        )
    }
}

export default new AuthRoutes().router
