import { checkSchema, ValidationChain } from 'express-validator'

export class BucketValidation {

    public static FieldsNecessary: ValidationChain[] = checkSchema({
        uuid: {
            in: ['params'],
            errorMessage: 'uuid is not a valid UUID',
            isUUID: true,
        },
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
