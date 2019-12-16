import { ResponseError } from '../'

export default class InternalErrorException extends ResponseError {
    constructor(stack?: string, detail?: string) {
        super(
            500,
            'internal_server_error',
            stack || 'Internal server error',
            detail,
        )
    }
}
