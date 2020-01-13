import { ResponseError } from '..'

export default class ForgotPassTokenNotExistsException extends ResponseError {
    constructor(detail?: string) {
        super(404, 'forgot_pass_token_not_exists', 'Forgot password token is not exists', detail)
    }
}
