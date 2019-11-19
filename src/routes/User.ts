import UserController from '../controllers/UserController'
import { BaseRoute } from '../models'
import { UserValidation } from '../controllers/Validation/UserValidation'
import { AuthValidation } from '../controllers/Validation/AuthValidation';

class UserRoutes extends BaseRoute {
    public initializeRoutes(): void {
        this.router.get(
            '/',
            AuthValidation.Connected,
            UserController.getUser,
        );

        this.router.get(
            '/:uuid',
            AuthValidation.Connected,
            UserValidation.UserParameter,
            UserController.getUser,
        );

        this.router.post(
            '/',
            UserValidation.Create,
            UserController.getHello,
        );

        this.router.put(
            '/:uuid',
            AuthValidation.Connected,
            UserValidation.Update,
            UserController.getHello,
        );

        this.router.delete(
            '/:uuid',
            AuthValidation.Connected,
            UserValidation.UserParameter,
            UserController.getHello,
        );

    }
}

export default new UserRoutes().router
