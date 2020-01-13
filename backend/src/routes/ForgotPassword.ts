import { BaseRoute } from '../models'
import { ForgotPassValidation } from '../controllers/Validation'
import { handleError } from '../middlewares/common'
import ForgotPassController from '../controllers/ForgotPassController'

class ForgotPasswordRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.get('/',
            ForgotPassValidation.CheckForgot,
            handleError,
            ForgotPassController.checkForgotToken
        )

        this.router.post(
            '/',
            ForgotPassValidation.CreateForgot,
            handleError,
            ForgotPassController.createForgotPassword,
        )

        this.router.put(
            '/',
            ForgotPassValidation.UpdatePassword,
            handleError,
            ForgotPassController.updatePassword,
        )
    }
}

export default new ForgotPasswordRoutes().router
