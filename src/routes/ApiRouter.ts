import { BaseRoute } from '../models/Route/BaseRoute'
import UserRoutes from './User'
import Loginroutes from './Login'
import RegisterRoutes from './Register'

class ApiRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.use('/user', UserRoutes)
        this.router.use('/login', Loginroutes)
        this.router.use('/register', RegisterRoutes)
    }
}

export default new ApiRoutes().router
