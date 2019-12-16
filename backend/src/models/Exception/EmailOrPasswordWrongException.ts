import { ResponseError } from '..'

export default class EmailOrPasswordWrongException extends ResponseError {
    constructor(detail?: string) {
        super(
            400,
            'email_password_incorrect',
            'Email or password are incorrects',
            detail,
        )
    }
}
