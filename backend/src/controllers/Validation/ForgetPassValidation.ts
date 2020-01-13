import { checkSchema, ValidationChain } from 'express-validator'

export default class ForgetPassValidation {
    public static CheckForget: ValidationChain[] = checkSchema({
        token: {
            in: ['query'],
            errorMessage: 'token provided is not valid',
            isString: true,
            isLength: {
                options: {
                    min: 1
                }
            }
        },
    })

    public static CreateForget: ValidationChain[] = checkSchema({
        email: {
            in: ['body'],
            errorMessage: 'email provided is not valid',
            isEmail: true,
        },
    })

    public static UpdatePassword: ValidationChain[] = checkSchema({
        token: {
            in: ['body'],
            errorMessage: 'token provided is not valid',
            isString: true,
            isLength: {
                options: {
                    min: 1
                }
            }
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
}