import React, { useState, useEffect, useContext } from 'react'
import { Upload, Icon, Button, message, Divider, Card, Row, Col, Spin, Empty } from "antd";
import { UploadChangeParam } from 'antd/lib/upload/interface';
import superagent from 'superagent'
import Bucket from '../api/models/Bucket';
import Blob from '../api/models/Blob';
import { URL } from '../api/data';
import UserContext from '../contexts/UserContext';
import ResponseApi from '../api/models/ResponseApi';
import BlobsResponse from '../api/response/BlobsResponse';
import BlobResponse from '../api/response/BlobResponse';

interface DeleteResponse {
    msg: string
}

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

    const deleteFile = async (blob: Blob) => {
        const response = await superagent
            .delete(`${URL}/users/${user!.uuid}/buckets/${bucket.id}/blobs/${blob.id}`)
            .ok(() => true)
            .set("Authorization", user!.token)
            .send()
        const responseApi = response.body as ResponseApi<DeleteResponse>
        if (responseApi.data) {
            message.success(responseApi.data.msg);
            fetchBlobs(false)
        } else {
            message.error(responseApi.error?.message ?? "Unknown error");
        }
    }

    const duplicateFile = async (blob: Blob) => {
        if (blobs) {
            // TODO: Clone and remove blob id
            setBlobs([...blobs, blob])
        }
        const response = await superagent
            .post(`${URL}/users/${user!.uuid}/buckets/${bucket.id}/blobs/${blob.id}/duplicate`)
            .ok(() => true)
            .set("Authorization", user!.token)
            .send()

        const responseApi = response.body as ResponseApi<BlobResponse>
        if (responseApi.data) {
            message.success(`Blob duplicate: "${responseApi.data.blob.name}" added`);
            fetchBlobs(false)
        } else {
            message.error(responseApi.error?.message ?? "Unknown error");
        }
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
            return <Empty />
        }
        return <Row gutter={[16, 16]}>
            {blobs.map((b) => (
                <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
                    <Card
                        hoverable
                        actions={[
                            <Icon type="download" key="download" onClick={(_) => downloadFile(b)} />,
                            <Icon type="copy" key="duplicate" onClick={(_) => duplicateFile(b)} />,
                            <Icon type="delete" key="delete" onClick={(_) => deleteFile(b)} />
                        ]}
                    >
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
                showUploadList={{
                    showPreviewIcon: false,
                    showRemoveIcon: false,
                    showDownloadIcon: false
                }}
            >
                <Button><Icon type="upload" /> Click to Upload</Button>
            </Upload>
        </div>
    );
}

export default BlobsList
