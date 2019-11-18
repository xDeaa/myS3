import { checkSchema, ValidationChain } from 'express-validator'

export class HelloValidation {
    public static Parameters: ValidationChain[] = checkSchema({
        name: {
            in: ['query'],
            errorMessage: 'name is not a valid string',
            isString: true,
            isLength: {
                options: { min: 1 },
            },
        },
    })
}
