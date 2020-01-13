import { ResponseError } from '..'

export default class ForgetPassTokenNotExistsException extends ResponseError {
    constructor(detail?: string) {
        super(404, 'forget_pass_token_not_exists', 'Forget password token is not exists', detail)
    }
}
