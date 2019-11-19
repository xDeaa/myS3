import { checkSchema, ValidationChain } from 'express-validator'

export class UserValidation {
    public static UserParameter: ValidationChain[] = checkSchema({
        uuid: {
            in: ['params'],
            errorMessage: 'uuid is not a valid UUID',
            isUUID: true,
        },
    })

    public static Create: ValidationChain[] = checkSchema({
        nickname: {
            in: ['body'],
            errorMessage: 'nickname is not a valid String',
            isString: true,
            isLength: {
                options: { min: 1 },
            },
        },
        email: {
            in: ['body'],
            errorMessage: 'email is not a valid Email',
            isEmail: true,
        },
        password: {
            in: ['body'],
            errorMessage: 'password must have at least 6 characters',
            isString: true,
            isLength: {
                options: { min: 6 },
            },
        },
    })

    public static Update: ValidationChain[] = checkSchema({
        uuid: {
            in: ['params'],
            errorMessage: 'uuid is not a valid UUID',
            isUUID: true,
        },
        nickname: {
            in: ['body'],
            errorMessage: 'nickname is not a valid String',
            isString: true,
            optional: true,
            isLength: {
                options: { min: 1 },
            },
        },
        email: {
            in: ['body'],
            errorMessage: 'email is not a valid Email',
            isEmail: true,
            optional: true,
        },
        password: {
            in: ['body'],
            errorMessage: 'password must have at least 6 characters',
            isString: true,
            optional: true,
            isLength: {
                options: { min: 6 },
            },
        },
    })
}
