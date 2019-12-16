import { ResponseError } from '..'

export default class NoFileException extends ResponseError {
    constructor(detail?: string) {
        super(400, 'no_file', 'No file was sent or file was corrupted', detail)
    }
}
