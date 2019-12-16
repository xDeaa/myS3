import { Response } from 'express'

interface IBaseResponse {
    log(): void
    toJSON(): object | null
}

export default class BaseResponse implements IBaseResponse {
    public readonly statusCode: number

    constructor(statusCode: number) {
        this.statusCode = statusCode
    }

    public sendJson(res: Response) {
        this.log()
        return res
            .status(this.statusCode)
            .json(this.toJSON())
            .end()
    }

    public log(): void {
        throw new Error('Method not implemented.')
    }

    public toJSON(): object | null {
        throw new Error('Method not implemented.')
    }
}
