import { checkSchema, ValidationChain, ParamSchema } from 'express-validator'

export default class BucketValidation {

    private static baseSchema: Record<string, ParamSchema> = {
        id: {
            in: ['params'],
            errorMessage: 'id is not a valid number',
            isInt: true,
        },
    }

    public static BucketParameter: ValidationChain[] = checkSchema(BucketValidation.baseSchema)

    public static FieldsNecessary: ValidationChain[] = checkSchema({
        name: {
            in: ['body'],
            errorMessage: 'name is not a valid String',
            isString: true,
            isLength: {
                options: { min: 1 },
            },
        },
    })

    public static UpdateParameter: ValidationChain[] = checkSchema({
        ...BucketValidation.baseSchema,
        name: {
            in: ['body'],
            errorMessage: 'name is not a valid String',
            isString: true,
            isLength: {
                options: { min: 1 },
            },
        },
    })
}
