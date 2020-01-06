import React, { useState, useEffect, useContext, useImperativeHandle, forwardRef } from 'react'
import { Menu, Spin, } from 'antd'
import superagent from 'superagent'
import Bucket from '../api/models/Bucket';
import { URL } from '../api/data';
import UserContext from '../contexts/UserContext';
import ResponseApi from '../api/models/ResponseApi';
import BucketsResponse from '../api/response/BucketsResponse';

type BucketListProps = {
    onBucketSelect: (bucket: Bucket) => void
}

export type BucketListRef = {
    addBucket: (newBucket: Bucket) => void
}

const BucketList = forwardRef<BucketListRef, BucketListProps>(({ onBucketSelect }, ref) => {
    const [buckets, setBuckets] = useState<Bucket[]>()
    const { user } = useContext(UserContext)

    useEffect(() => {
        fetchBuckets(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useImperativeHandle(ref, () => ({ addBucket }));

    const addBucket = (newBucket: Bucket) => {
        if (buckets && !buckets.find(b => b.id === newBucket.id)) {
            setBuckets([...buckets, newBucket]) // Optimitic UI
            fetchBuckets(false, newBucket.id)
        }
    }

    const fetchBuckets = async (isFirstCall?: boolean, forceSelectId?: number) => {
        const response = await superagent.get(`${URL}/users/${user!.uuid}/buckets`)
            .set("Authorization", user!.token)
            .send()

        // TODO: Add statusCode check
        const apiResponse = response.body as ResponseApi<BucketsResponse>
        if (apiResponse.data) {
            const result = apiResponse.data.buckets
            setBuckets(result)
            if (result.length > 0) {
                if (isFirstCall) {
                    return onBucketSelect(result[0])
                }
                const bucket = forceSelectId
                        ? result.find((b) => b.id === forceSelectId)
                        : undefined
                if (bucket) {
                    onBucketSelect(bucket)
                }
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
})

export default BucketList
