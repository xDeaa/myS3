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
            const errorObject: ResponseError = new ResponseError(
                400,
                'error_invalid_parameter',
                'Parameters invalid: ' + JSON.stringify(errors.mapped()),
                JSON.stringify(errors.array()),
            )
            const defaultData: Record<string, any> = {}
            return {
                err: errorObject,
                data: {
                    bodyData: defaultData,
                    queryData: defaultData,
                    paramsData: defaultData,
                    headersData: defaultData,
                    cookiesData: defaultData,
                },
            }
        }

        return {
            data: {
                bodyData: matchedData(req, { locations: ['body'] }),
                queryData: matchedData(req, { locations: ['query'] }),
                paramsData: matchedData(req, { locations: ['params'] }),
                headersData: matchedData(req, { locations: ['headers'] }),
                cookiesData: matchedData(req, { locations: ['cookies'] }),
            },
            err: null,
        }
    }

    public static errorFormatter(error: ValidationError) {
        return `${error.location}[${error.param}]: ${error.msg}`
    }
}
