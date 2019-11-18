import { BaseRoute } from '../models/Route/BaseRoute'
import HelloRoutes from './Hello'

class ApiRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.use('/hello', HelloRoutes)
    }
}

export default new ApiRoutes().router
