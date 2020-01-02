import React, { useState, useRef } from 'react'
import BucketList, { BucketListRef } from '../components/BucketList'
import PageContent from '../components/PageContent'
import { Col, Row } from 'antd'
import BlobsList from '../components/BlobsList'
import Bucket from '../api/models/Bucket'
import AddNewBucketForm from '../components/AddNewBucketForm'

const breadcrumbPages = [
    {
        name: "Buckets",
        icon: ""
    }
]

const BucketsPage = () => {
    const [currentBucket, setCurrentBucket] = useState<Bucket>()
    const bucketListRef = useRef<BucketListRef>(null);

    const onNewBucket = (newBucket: Bucket) => {
        if (bucketListRef && bucketListRef.current) {
            bucketListRef.current.addBucket(newBucket)
        }
    }

    return (
        <PageContent title="Buckets" breadcrumbPages={breadcrumbPages}>
            <AddNewBucketForm onNewBucket={onNewBucket} />
            <Row>
                <Col span={6}>
                    <BucketList ref={bucketListRef} onBucketSelect={setCurrentBucket} />
                </Col>
                <Col span={18}>
                    {currentBucket && <BlobsList bucket={currentBucket} />}
                </Col>
            </Row>
        </PageContent>
    )
}

export default BucketsPage
