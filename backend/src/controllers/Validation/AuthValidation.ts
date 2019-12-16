import { checkSchema, ValidationChain, ParamSchema } from 'express-validator'

export default class AuthValidation {
    private static emailPasswordShema: Record<string, ParamSchema> = {
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
    }

    public static Login: ValidationChain[] = checkSchema(
        AuthValidation.emailPasswordShema,
    )

    public static Create: ValidationChain[] = checkSchema({
        ...AuthValidation.emailPasswordShema,
        nickname: {
            in: ['body'],
            errorMessage: 'nickname is not a valid String',
            isString: true,
            isLength: {
                options: { min: 1 },
            },
        },
    })
}
