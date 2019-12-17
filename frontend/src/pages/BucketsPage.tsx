import React from 'react'
import BucketList from '../components/BucketList'
import PageContent from '../components/PageContent'

const breadcrumbPages = [
    {
        name: "Buckets",
        icon: ""
    }
]

const BucketsPage = () => {
    return (
        <PageContent title="Buckets" breadcrumbPages={breadcrumbPages}>
            <BucketList />
        </PageContent>
    )
}

export default BucketsPage
