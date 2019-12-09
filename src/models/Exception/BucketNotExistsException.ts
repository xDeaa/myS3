import { ResponseError } from '..'

export default class BucketNotExistsException extends ResponseError {
    constructor(detail?: string) {
        super(404, 'bucket_not_exists', 'Bucket is not exists', detail)
    }
}
