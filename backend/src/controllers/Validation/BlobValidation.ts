import { checkSchema, ValidationChain } from 'express-validator'

export default class BlobValidation {
    public static BlobParameter: ValidationChain[] = checkSchema({
        blobId: {
            in: ['params'],
            errorMessage: 'id is not a valid number',
            isInt: true,
        },
    })

    public static Add: ValidationChain[] = checkSchema({})
}
