import React, { useState, useRef, useContext } from 'react'
import BucketList, { BucketListRef } from '../components/BucketList'
import PageContent from '../components/PageContent'
import { Col, Row, Divider, Icon, message } from 'antd'
import BlobsList from '../components/BlobsList'
import Bucket from '../api/models/Bucket'
import AddNewBucketForm from '../components/AddNewBucketForm'
import superagent from 'superagent'
import UserContext from '../contexts/UserContext'
import ResponseApi from '../api/models/ResponseApi'
import DeleteResponse from '../api/response/DeleteResponse'
import { URL } from '../api/data'

const breadcrumbPages = [
    {
        name: "Buckets",
        icon: ""
    }
]

const BucketsPage = () => {
    const [currentBucket, setCurrentBucket] = useState<Bucket>()
    const bucketListRef = useRef<BucketListRef>(null);
    const { user } = useContext(UserContext)

    const onNewBucket = (newBucket: Bucket) => {
        if (bucketListRef && bucketListRef.current) {
            bucketListRef.current.addBucket(newBucket)
        }
    }

    const deleteBucket = async (bucket: Bucket) => {
        if (!bucketListRef || !bucketListRef.current) {
            return
        }
        const isEmptyBuckets = bucketListRef.current.deleteBucket(bucket) // Optimistic UI
        if (isEmptyBuckets) {
            setCurrentBucket(undefined)
        }
        const response = await superagent
            .delete(`${URL}/users/${user!.uuid}/buckets/${bucket.id}`)
            .ok(() => true)
            .set("Authorization", user!.token)
            .send()

        const responseApi = response.body as ResponseApi<DeleteResponse>
        if (responseApi.data) {
            message.success(responseApi.data.msg);
        } else {
            message.error(responseApi.error?.message ?? "Unknown error");
            bucketListRef.current.addBucket(bucket)
        }
    }

    return (
        <PageContent title="Buckets" breadcrumbPages={breadcrumbPages}>
            <Row>
                <Col span={6}>
                    <AddNewBucketForm onNewBucket={onNewBucket} />
                    <BucketList ref={bucketListRef} onBucketSelect={setCurrentBucket} />
                </Col>
                <Col span={18}>
                    {currentBucket && (
                        <div style={{ margin: '0 16px 0 32px' }}>
                            <h2>
                                {currentBucket.name}
                                <Icon
                                    type="delete"
                                    theme="twoTone"
                                    twoToneColor="#eb2f96"
                                    style={{ marginLeft: 12 }}
                                    title="Delete bucket"
                                    onClick={() => deleteBucket(currentBucket)}
                                />
                            </h2>
                            <Divider />
                            <BlobsList bucket={currentBucket} />
                        </div>
                    )}
                </Col>
            </Row>
        </PageContent >
    )
}

export default BucketsPage
