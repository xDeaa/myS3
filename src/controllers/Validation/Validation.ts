import { Request } from 'express'
import {
    matchedData,
    ValidationError,
    validationResult,
} from 'express-validator'
import { ResponseError } from './../../models'

export class Validation {
    public static Data = (req: Request) => {
        const errors = validationResult(req).formatWith(
            Validation.errorFormatter,
        )

        if (!errors.isEmpty()) {
            const err: ResponseError = new ResponseError(
                400,
                'error_invalid_parameter',
                'Parameters invalid: ' + JSON.stringify(errors.mapped()),
                JSON.stringify(errors.array()),
            )
            return { err }
        }

        req.body = matchedData(req, { locations: ['body'] });
        req.query = matchedData(req, { locations: ['query'] });
        req.params = matchedData(req, { locations: ['params'] });
        req.headers = matchedData(req, { locations: ['headers'] });
        req.cookies = matchedData(req, { locations: ['cookies'] });

        return { err: null }
    }

    public static errorFormatter(error: ValidationError) {
        return `${error.location}[${error.param}]: ${error.msg}`
    }
}
