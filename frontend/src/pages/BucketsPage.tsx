import React, { useState } from 'react'
import BucketList from '../components/BucketList'
import PageContent from '../components/PageContent'
import { Col, Row } from 'antd'

const breadcrumbPages = [
    {
        name: "Buckets",
        icon: ""
    }
]

const BucketsPage = () => {
    const [currentBucket, setCurrentBucket] = useState()
    return (
        <PageContent title="Buckets" breadcrumbPages={breadcrumbPages}>
            <Row>
                <Col span={4}>
                    <BucketList onBucketSelect={setCurrentBucket} />
                </Col>
                <Col span={8}>
                    {currentBucket && (
                        <></>
                    )}
                </Col>
            </Row>
        </PageContent>
    )
}

export default BucketsPage
