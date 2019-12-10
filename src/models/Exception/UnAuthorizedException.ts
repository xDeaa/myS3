import { ResponseError } from '..'

export default class UnAuthorizedException extends ResponseError {
    constructor(detail?: string) {
        super(
            401,
            'unauthorized',
            'You must provide Authorization header !',
            detail,
        )
    }
}