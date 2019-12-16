import { ResponseError } from '..'

export default class BlobNotExistsException extends ResponseError {
    constructor(detail?: string) {
        super(404, 'blob_not_exists', 'Blob is not exists', detail)
    }
}
