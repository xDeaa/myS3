import { ResponseError } from '..'

export default class AlreadyBucketExistsException extends ResponseError {
    constructor(detail?: string) {
        super(400, 'bucket_already_exists', 'Name already taken', detail)
    }
}
