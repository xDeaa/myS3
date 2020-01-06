import React, { useState, useEffect, useContext } from 'react'
import { Upload, Icon, Button, message, Divider, Card, Row, Col, Spin } from "antd";
import { UploadChangeParam } from 'antd/lib/upload/interface';
import superagent from 'superagent'
import Bucket from '../api/models/Bucket';
import Blob from '../api/models/Blob';
import { URL } from '../api/data';
import UserContext from '../contexts/UserContext';
import ResponseApi from '../api/models/ResponseApi';
import BlobsResponse from '../api/response/BlobsResponse';

type BlobsListProps = {
    bucket: Bucket
}

// TODO: Add to a util function
const displaySize = (size: number): string => {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return `${(size / Math.pow(1024, i)).toFixed(2)} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`;
}

const BlobsList = ({ bucket }: BlobsListProps) => {
    const [blobs, setBlobs] = useState<Blob[]>()
    const { user } = useContext(UserContext)

    useEffect(() => {
        fetchBlobs(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bucket])

    const fetchBlobs = async (resetBlobs: boolean): Promise<void> => {
        if (resetBlobs) {
            setBlobs(undefined)
        }
        const response = await superagent.get(`${URL}/users/${user!.uuid}/buckets/${bucket.id}/blobs`)
            .set("Authorization", user!.token)
            .ok(() => true)
            .send()

        const apiResponse = response.body as ResponseApi<BlobsResponse>
        if (apiResponse.data) {
            setBlobs(apiResponse.data.blobs)
            return
        }
        setBlobs([])
    }

    const downloadFile = async (blob: Blob) => {
        const response = await fetch(
            `${URL}/users/${user!.uuid}/buckets/${bucket.id}/blobs/${blob.id}/download`,
            {
                method: "GET",
                headers: { "Authorization": user!.token }
            }
        )
        const blobResponse = await response.blob()
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(blobResponse);
        a.download = blob.name;
        a.click();
    }

    const handleChange = ({ fileList, file }: UploadChangeParam) => {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
        if (file.status === 'done') {
            message.success(`${file.name} file uploaded successfully`);
            fetchBlobs(false); // Call fetch to update blobs list after upload done
        } else if (file.status === 'error') {
            message.error(`${file.name} file upload failed: ${file.response.error.message}`);
        }
    }

    const renderList = (): React.ReactNode => {
        if (blobs === undefined) {
            return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spin />
            </div>
        }
        if (blobs.length === 0) {
            return <p>No blobs found in this bucket</p>
        }
        return <Row gutter={[16, 16]}>
            {blobs.map((b) => (
                <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
                    <Card hoverable onClick={_ => downloadFile(b)}>
                        <Card.Meta title={b.name} description={displaySize(b.size)} />
                    </Card>
                </Col>
            ))}
        </Row>
    }

    return (
        <div style={{ padding: 16 }}>
            {renderList()}
            < Divider />

            <Upload
                method="post"
                action={`${URL}/users/${user!.uuid}/buckets/${bucket.id}/blobs`}
                headers={{ "Authorization": user!.token }}
                name="blob"
                listType="text"
                onChange={handleChange}
            >
                <Button>
                    <Icon type="upload" /> Click to Upload
                </Button>
            </Upload>
        </div>
    );
}

export default BlobsList
