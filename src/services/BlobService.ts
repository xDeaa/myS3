import { getManager, DeleteResult } from 'typeorm'
import { Bucket, Blob } from '../entities'
import {
    AlreadyBlobExistsException,
    BlobNotExistsException,
} from '../models/Exception'

export default class BlobService {
    /**
     * Find all buckets of a specific user
     * @param bucket Bucket who own the blob
     */
    public static getBlobs(bucket: Bucket): Promise<Blob[]> {
        return getManager()
            .getRepository(Blob)
            .find({ bucket })
    }

    /**
     * Get a specific blob
     * @param bucket Bucket who own the blob to retrieve
     * @param id Id of blob
     */
    public static async getBlob(bucket: Bucket, id: number): Promise<Blob> {
        const blob = await getManager()
            .getRepository(Blob)
            .findOne({ id, bucket })

        if (!blob) {
            throw new BlobNotExistsException()
        }

        return blob
    }

    /**
     * Save a new Blob
     * @param blob new blob to save
     */
    public static async saveBlob(blob: Blob): Promise<Blob> {
        const exist: number = await getManager()
            .getRepository(Blob)
            .count({ where: { name: blob.name, bucket: blob.bucket } })

        if (exist > 0) {
            throw new AlreadyBlobExistsException()
        }

        return getManager()
            .getRepository(Blob)
            .save(blob)
    }

    /**
     * Delete a blob
     * @param blob blob of the bucket to retrieve
     */
    public static async deleteBlob(blob: Blob): Promise<void> {
        const deletedBlob: DeleteResult = await getManager()
            .getRepository(Blob)
            .delete(blob.id)

        if (!deletedBlob || deletedBlob.affected === 0) {
            throw new BlobNotExistsException()
        }
    }
}
