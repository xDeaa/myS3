import Bucket from "../models/Bucket";
import Blob from "../models/Blob";

export default interface BlobsResponse {
    blobs: Blob[]
}