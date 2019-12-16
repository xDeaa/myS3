import { getRepository } from 'typeorm'
import { User, Bucket } from '../entities'
import {
    AlreadyBucketExistsException,
    BucketNotExistsException,
} from '../models/Exception'
import { BaseService } from '.'

export default class BucketService {
    /**
     * Save a new Bucket
     * @param bucket new bucket to save
     */
    public static async saveBucket(bucket: Bucket): Promise<Bucket> {
        const exist: number = await getRepository(Bucket).count({
            where: {
                name: bucket.name,
                user: bucket.user,
            },
        })

        if (exist > 0) {
            throw new AlreadyBucketExistsException()
        }

        return getRepository(Bucket).save(bucket)
    }

    /**
     * Update a specific bucket
     * @param id id of the bucket to update
     */
    public static updateBucket(bucket: Bucket): Promise<Bucket> {
        return getRepository(Bucket).save(bucket)
    }

    /**
     * Delete a bucket
     * @param id id of the user to retrieve
     */
    public static deleteBucket(bucket: Bucket): Promise<void> {
        return BaseService.baseDelete(
            Bucket,
            bucket.id,
            new BucketNotExistsException(),
        )
    }

    /**
     * Find all buckets of a specific user
     * @param user User who own the buckets
     */
    public static getBuckets(user: User): Promise<Bucket[]> {
        return getRepository(Bucket).find({ user })
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
        const bucketCount = await getRepository(Bucket).count({ id, user })
        return bucketCount > 0
    }

    /**
     * Get a specific bucket
     * @param user User who own the bucket to retrieve
     * @param id Id of bucket
     */
    public static async getBucket(user: User, id: number): Promise<Bucket> {
        const bucket = await getRepository(Bucket).findOne({ id, user })

        if (!bucket) {
            throw new BucketNotExistsException()
        }

        return bucket
    }
}
