import { checkSchema, ValidationChain, ParamSchema } from 'express-validator'

export default class UserValidation {
    private static baseSchema: Record<string, ParamSchema> = {
        uuid: {
            in: ['params'],
            errorMessage: 'uuid is not a valid UUID',
            isUUID: true,
        },
    }

    public static UserParameter: ValidationChain[] = checkSchema(
        UserValidation.baseSchema,
    )

    public static Update: ValidationChain[] = checkSchema({
        ...UserValidation.baseSchema,
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
