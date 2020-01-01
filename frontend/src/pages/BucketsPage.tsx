import React, { useState } from 'react'
import BucketList from '../components/BucketList'
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

    return (
        <PageContent title="Buckets" breadcrumbPages={breadcrumbPages}>
            <AddNewBucketForm onNewBucket={setCurrentBucket} />
            <Row>
                <Col span={6}>
                    <BucketList onBucketSelect={setCurrentBucket} latestBucket={currentBucket} />
                </Col>
                <Col span={18}>
                    {currentBucket && <BlobsList bucket={currentBucket} />}
                </Col>
            </Row>
        </PageContent>
    )
}

export default BucketsPage
