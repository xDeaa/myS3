import Logger from '../../controllers/Logger'
import BaseResponse from './BaseResponse'

export default class ResponseError extends BaseResponse {
    public readonly code: string
    public readonly message: string
    public readonly detail?: string

    constructor(
        statusCode: number,
        code: string,
        message: string,
        detail?: string,
    ) {
        super(statusCode)
        this.code = code
        this.message = message
        this.detail = detail
    }

    public log() {
        Logger.errorLog(this.message, this.detail, this.code)
    }

    public toJSON() {
        return {
            error: {
                code: this.code,
                message: this.message,
            },
        }
    }
}
