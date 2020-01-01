import React, { useState, useEffect, useContext } from 'react'
import { Menu, Spin, } from 'antd'
import superagent from 'superagent'
import Bucket from '../api/models/Bucket';
import { URL } from '../api/data';
import UserContext from '../contexts/UserContext';
import ResponseApi from '../api/models/ResponseApi';
import BucketsResponse from '../api/response/BucketsResponse';

type OnBucketSelect = (bucket: Bucket) => void;
type BucketListProps = {
    onBucketSelect: OnBucketSelect
    latestBucket?: Bucket
}

const BucketList = ({ latestBucket, onBucketSelect }: BucketListProps) => {
    const [buckets, setBuckets] = useState<Bucket[]>()
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (buckets && latestBucket && buckets.some(b => b.id === latestBucket.id)) {
            setBuckets([...buckets, latestBucket]) // Optimitic UI
        }
        fetchBuckets()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [latestBucket])

    const fetchBuckets = async () => {
        const response = await superagent.get(`${URL}/users/${user!.uuid}/buckets`)
            .set("Authorization", user!.token)
            .send()

        // TODO: Add statusCode check
        const apiResponse = response.body as ResponseApi<BucketsResponse>
        if (apiResponse.data) {
            const result = apiResponse.data.buckets
            setBuckets(result)
            if (result.length > 0 && latestBucket && latestBucket.id !== result[0].id) {
                onBucketSelect(result[0])
            }
        } else {
            setBuckets([])
        }
    }

    const buildBuckets = () => {
        if (!buckets) return <></>
        if (buckets.length === 0) {
            return <p>Empty bucket list :/</p>
        }
        return buckets.map((e) => <Menu.Item key={e.id} onClick={_ => onBucketSelect(e)}>{e.name}</Menu.Item>)
    }

    if (!buckets) {
        return <Spin />
    }

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
        >
            {buildBuckets()}
        </Menu>
    )
}

export default BucketList
