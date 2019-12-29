import React, { useState } from 'react'
import BucketList from '../components/BucketList'
import PageContent from '../components/PageContent'
import { Col, Row } from 'antd'
import BlobsList from '../components/BlobsList'
import Bucket from '../api/models/Bucket'

const breadcrumbPages = [
    {
        name: "Buckets",
        icon: ""
    }
]

const BucketsPage = (props: any) => {
    const [currentBucket, setCurrentBucket] = useState<Bucket>()
    const { user } = props.location.state
    return (
        <PageContent title="Buckets" breadcrumbPages={breadcrumbPages}>
            <Row>
                <Col span={6}>
                    <BucketList onBucketSelect={setCurrentBucket} user={user}/>
                </Col>
                <Col span={18}>
                    {currentBucket && <BlobsList bucket={currentBucket} user={user} />}
                </Col>
            </Row>
        </PageContent>
    )
}

export default BucketsPage
