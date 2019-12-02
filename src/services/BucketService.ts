import { getManager } from 'typeorm'
import { User, Bucket } from '../entities'

export default class BucketService {
    /**
     * Save a new Bucket
     * @param name name of the new bucket
     * @param user user of the new user
     */
    public static async saveBucket(name: string, user: User): Promise<Bucket> {
        const bucket: Bucket = new Bucket()
        bucket.name = name
        bucket.user = user

        return await getManager()
            .getRepository(Bucket)
            .save(bucket)
    }
}
