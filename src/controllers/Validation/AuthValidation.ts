import { checkSchema, ValidationChain } from 'express-validator'

export default class AuthValidation {

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

    public static Login: ValidationChain[] = checkSchema({
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
}
