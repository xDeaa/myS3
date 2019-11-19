import { BaseRoute } from '../models'
import { AuthValidation } from '../controllers/Validation/AuthValidation'

class RegisterRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.post('/', AuthValidation.NotConnected)
    }
}

export default new RegisterRoutes().router
