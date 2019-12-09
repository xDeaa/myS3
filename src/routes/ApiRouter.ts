import { handleAuth, handleNotAuth } from './../middlewares/common'
import { BaseRoute } from '../models/Route/BaseRoute'
import UserRoutes from './User'
import AuthRoutes from './Auth'
import BucketRoutes from './Bucket'

class ApiRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.use('/users', handleAuth, UserRoutes)
        this.router.use('/auth', handleNotAuth, AuthRoutes)
    }
}

export default new ApiRoutes().router
