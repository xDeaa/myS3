import HelloController from '../controllers/HelloController'
import { BaseRoute } from '../models'
import { HelloValidation } from '../controllers/Validation/CheckinValidation'

class HelloRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.get(
            '/',
            HelloValidation.Parameters,
            HelloController.getHello,
        )
    }
}

export default new HelloRoutes().router
