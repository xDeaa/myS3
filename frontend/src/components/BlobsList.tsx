import React, { useState, useEffect } from 'react'
import { Upload, Icon, Button, message, Divider, Card, Row, Col, Spin } from "antd";
import { UploadChangeParam } from 'antd/lib/upload/interface';
import superagent from 'superagent'
import Bucket from '../api/models/Bucket';
import BlobModel from '../api/models/Blob';
import { URL, APIKEY } from '../api/data';

type BlobsListProps = {
    bucket: Bucket
}

// TODO: Add to a util function
const displaySize = (size: number): string => {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return `${(size / Math.pow(1024, i)).toFixed(2)} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`;
}

const BlobsList = ({ bucket }: BlobsListProps) => {
    const [blobs, setBlobs] = useState<BlobModel[] | null>()

    useEffect(() => {
        fetchBlobs(true)
    }, [bucket])

    const fetchBlobs = async (resetBlobs: boolean) => {
        if (resetBlobs) {
            setBlobs(null)
        }
        // TODO: Call api
        // Simulate api call
        const response = await superagent.get(`${URL}/users/b97cc746-201a-4b8b-bf12-5765d9e114db/buckets/${bucket.id}/blobs`)
            .set("Authorization", APIKEY)
            .send()

        const result: BlobModel[] = response.body.data.blobs
        setBlobs(result)
    }

    const downloadFile = (blob: BlobModel) => {
        // TODO: Call api to download file
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

    return (
        <div style={{ padding: 16 }}>
            {blobs ? (
                <Row gutter={[16, 16]}>
                    {blobs.map((b) => (
                        <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
                            <Card hoverable onClick={_ => downloadFile(b)}>
                                <Card.Meta title={b.name} description={displaySize(b.size)} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Spin />
                    </div>
                )}

            < Divider />

            <Upload
                method="post"
                action={`${URL}/users/b97cc746-201a-4b8b-bf12-5765d9e114db/buckets/${bucket.id}/blobs`}
                headers={{ "Authorization": APIKEY }}
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