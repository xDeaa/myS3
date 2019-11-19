import { BaseRoute } from '../models'
import { AuthValidation } from '../controllers/Validation/AuthValidation'

class LoginRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.post('/', AuthValidation.NotConnected)
    }
}

export default new LoginRoutes().router
