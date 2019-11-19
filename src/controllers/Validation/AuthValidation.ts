import { checkSchema, ValidationChain } from 'express-validator'

export class AuthValidation {
    public static Connected: ValidationChain[] = checkSchema({
        authorization: {
            in: ['headers'],
            errorMessage: 'You must be connected',
            isJWT: true,
        },
    })

    public static NotConnected: ValidationChain[] = checkSchema({
        authorization: {
            in: ['headers'],
            errorMessage: 'You are already connected',
            exists: {
                options: {
                    checkNull: true,
                },
            },
        },
    })
}
