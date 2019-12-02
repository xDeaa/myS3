import { ResponseError } from '..'

export default class AlreadyUserExistsException extends ResponseError {
    constructor(detail?: string) {
        super(
            400,
            'user_already_exists',
            'Email or nickname already taken',
            detail,
        )
    }
}
