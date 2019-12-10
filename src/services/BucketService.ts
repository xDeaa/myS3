import { getManager, DeleteResult } from 'typeorm'
import { User, Bucket } from '../entities'
import {
    AlreadyBucketExistsException,
    BucketNotExistsException,
} from '../models/Exception'

export default class BucketService {
    /**
     * Find all buckets of a specific user
     * @param user User who own the buckets
     */
    public static getBuckets(user: User): Promise<Bucket[]> {
        return getManager()
            .getRepository(Bucket)
            .find({ user })
    }

    /**
     * Check if a specific bucket exists
     * @param user User who own the bucket to retrieve
     * @param id Id of bucket
     */
    public static async isBucketExists(
        user: User,
        id: number,
    ): Promise<boolean> {
        const bucketCount = await getManager()
            .getRepository(Bucket)
            .count({ id, user })

        return bucketCount > 0
    }

    /**
     * Get a specific bucket
     * @param user User who own the bucket to retrieve
     * @param id Id of bucket
     */
    public static async getBucket(user: User, id: number): Promise<Bucket> {
        const bucket = await getManager()
            .getRepository(Bucket)
            .findOne({ id, user })

        if (!bucket) {
            throw new BucketNotExistsException()
        }
        return bucket
    }

    /**
     * Save a new Bucket
     * @param bucket new bucket to save
     */
    public static async saveBucket(bucket: Bucket): Promise<Bucket> {
        const exist: number = await getManager()
            .getRepository(Bucket)
            .count({ where: { name: bucket.name, user: bucket.user } })

        if (exist > 0) {
            throw new AlreadyBucketExistsException()
        }

        return getManager()
            .getRepository(Bucket)
            .save(bucket)
    }

    /**
     * Update a specific bucket
     * @param id id of the bucket to update
     */
    public static async updateBucket(bucket: Bucket): Promise<Bucket> {
        return getManager()
            .getRepository(Bucket)
            .save(bucket)
    }

    /**
     * Delete a bucket
     * @param id id of the user to retrieve
     */
    public static async deleteBucket(bucket: Bucket): Promise<void> {
        const deletedBucket: DeleteResult = await getManager()
            .getRepository(Bucket)
            .delete(bucket.id)

        if (!deletedBucket || deletedBucket.affected === 0) {
            throw new BucketNotExistsException()
        }
    }
}
