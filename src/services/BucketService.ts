import { getManager } from 'typeorm'
import { User, Bucket } from '../entities'
import {
    AlreadyBucketExistsException,
    BucketNotExistsException,
} from '../models/Exception'

export default class BucketService {
    /**
     * Find all buckets of a specific user
     */
    public static async getBuckets(uuid: string): Promise<Bucket[]> {
        const user: User = new User()
        user.uuid = uuid

        return getManager()
            .getRepository(Bucket)
            .find({ user })
    }

    /**
     * Check if a bucket exists
     * @param user User who own the bucket to retrieve
     * @param id Id of bucket
     */
    public static async isBucketExists(
        uuid: string,
        id: number,
    ): Promise<boolean> {
        const user: User = new User()
        user.uuid = uuid

        const bucket = await getManager()
            .getRepository(Bucket)
            .findOne({ id, user })
        return bucket ? true : false
    }

    /**
     * Save a new Bucket
     * @param name name of the new bucket
     * @param user User who owns the bucket
     */
    public static async saveBucket(
        name: string,
        uuid: string,
    ): Promise<Bucket> {
        const bucket: Bucket = new Bucket()
        bucket.name = name

        const user: User = new User()
        user.uuid = uuid
        bucket.user = user

        const exist = await getManager()
            .getRepository(Bucket)
            .count({ where: { name, user } })

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
    public static async updateBucket(
        id: number,
        name: string,
    ): Promise<Bucket> {
        const bucketFound = await getManager()
            .getRepository(Bucket)
            .findOne(id)

        if (!bucketFound) {
            throw new BucketNotExistsException()
        }

        bucketFound.name = name

        return getManager()
            .getRepository(Bucket)
            .save(bucketFound)
    }

    /**
     * Delete a bucket
     * @param id id of the user to retrieve
     */
    public static async deleteBucket(id: number): Promise<void> {
        const deletedBucket = await getManager()
            .getRepository(Bucket)
            .delete(id)

        if (!deletedBucket || deletedBucket.affected === 0) {
            throw new BucketNotExistsException()
        }
    }
}
