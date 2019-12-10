import { ResponseError } from '..'

export default class AlreadyBlobExistsException extends ResponseError {
    constructor(detail?: string) {
        super(400, 'blob_already_exists', 'Name already taken', detail)
    }
}
