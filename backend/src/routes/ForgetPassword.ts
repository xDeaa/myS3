import { BaseRoute } from '../models'
import { ForgetPassValidation } from '../controllers/Validation'
import { handleError } from '../middlewares/common'
import ForgetPassController from '../controllers/ForgetPassController'

class ForgetPasswordRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.get('/',
            ForgetPassValidation.CheckForget,
            handleError,
            ForgetPassController.checkForgetToken
        )

        this.router.post(
            '/',
            ForgetPassValidation.CreateForget,
            handleError,
            ForgetPassController.createForgetPassword,
        )

        this.router.put(
            '/',
            ForgetPassValidation.UpdatePassword,
            handleError,
            ForgetPassController.updatePassword,
        )
    }
}

export default new ForgetPasswordRoutes().router
