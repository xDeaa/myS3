import React from 'react'
import BucketList from '../components/BucketList'
import BreadcrumbPage from '../components/Breadcrumb'

const breadcrumbPages = [
    {
        name: "Buckets",
        icon: ""
    }
]

const BucketsPage = () => {
    return (
        <>
            <BreadcrumbPage pages={breadcrumbPages} />
            <h1>Buckets</h1>
            <BucketList />
        </>
    )
}

export default BucketsPage
