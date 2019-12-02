import { ResponseError } from '..'

export default class UserNotExistsException extends ResponseError {
    constructor(detail?: string) {
        super(
            404,
            'user_not_exists',
            'User is not exists',
            detail,
        )
    }
}
