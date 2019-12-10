import { Logger } from '../../controllers/Logger'
import BaseResponse from './BaseResponse'

export default class ResponseData<T extends object> extends BaseResponse {
    public readonly data?: T

    constructor(statusCode: number, data?: T) {
        super(statusCode)
        this.data = data
    }

    public log() {
        Logger.debugLog('ResponseData send', JSON.stringify(this.data))
    }

    public toJSON() {
        if (!this.data) return null
        return {
            data: this.data,
        }
    }
}
