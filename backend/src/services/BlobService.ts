import { getRepository } from 'typeorm'
import { Bucket, Blob } from '../entities'
import {
    AlreadyBlobExistsException,
    BlobNotExistsException,
} from '../models/Exception'
import { BaseService } from '.'

export default class BlobService {
    /**
     * Save a new Blob
     * @param blob new blob to save
     */
    public static async saveBlob(blob: Blob): Promise<Blob> {
        const exist: number = await getRepository(Blob).count({
            where: {
                name: blob.name,
                bucket: blob.bucket,
            },
        })

        if (exist > 0) {
            throw new AlreadyBlobExistsException()
        }

        return getRepository(Blob).save(blob)
    }

    /**
     * Delete a blob
     * @param blob blob of the bucket to retrieve
     */
    public static deleteBlob(blob: Blob): Promise<void> {
        return BaseService.baseDelete(
            Blob,
            blob.id,
            new BlobNotExistsException(),
        )
    }

    /**
     * Find all blobs of a specific bucket
     * @param bucket Bucket who own the blob
     */
    public static getBlobs(bucket: Bucket): Promise<Blob[]> {
        return getRepository(Blob).find({ bucket })
    }

    /**
     * Get a specific blob
     * @param bucket Bucket who own the blob to retrieve
     * @param id Id of blob
     */
    public static async getBlob(bucket: Bucket, id: number): Promise<Blob> {
        const blob = await getRepository(Blob).findOne({ id, bucket })

        if (!blob) {
            throw new BlobNotExistsException()
        }

        return blob
    }
}
