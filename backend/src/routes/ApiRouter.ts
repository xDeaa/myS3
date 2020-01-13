import { handleAuth, handleNotAuth } from './../middlewares/common'
import BaseRoute from '../models/Route/BaseRoute'
import UserRoutes from './User'
import AuthRoutes from './Auth'
import ForgetPasswordRoutes from './ForgetPassword'

class ApiRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.use('/users', handleAuth, UserRoutes)
        this.router.use('/auth', handleNotAuth, AuthRoutes)
        this.router.use('/forget_password', handleNotAuth, ForgetPasswordRoutes)
    }
}

export default new ApiRoutes().router
