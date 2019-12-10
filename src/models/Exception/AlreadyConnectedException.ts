import { ResponseError } from '..'

export default class AlreadyConnectedException extends ResponseError {
    constructor(detail?: string) {
        super(400, 'user_connected', 'Header Authorization must be empty', detail)
    }
}
