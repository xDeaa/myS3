import { User, Bucket, Blob } from '../entities'

export default interface AppAttributes {
    user: User
    bucket: Bucket
    blob: Blob
}
