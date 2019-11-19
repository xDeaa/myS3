import { BaseRoute } from '../models'
import { UserValidation } from '../controllers/Validation/UserValidation'
import UserController from '../controllers/UserController'
import { handleError } from '../middlewares/common'

class AuthRoutes extends BaseRoute {
    public initializeRoutes(): void {
        /// TODO: Controller
        this.router.post('/login')
        this.router.post(
            '/register',
            UserValidation.Create,
            handleError,
            UserController.createUser,
        )
    }
}

export default new AuthRoutes().router
