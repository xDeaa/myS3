import React, { useState, useEffect, useContext, useImperativeHandle, forwardRef } from 'react'
import { Menu, Spin, Empty } from 'antd'
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
    deleteBucket: (bucket: Bucket) => boolean
}

const BucketList = forwardRef<BucketListRef, BucketListProps>(({ onBucketSelect }, ref) => {
    const [buckets, setBuckets] = useState<Bucket[]>()
    const [selectedBucketId, setSelectedBucketId] = useState<string>()
    const { user } = useContext(UserContext)

    useEffect(() => {
        fetchBuckets(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useImperativeHandle(ref, () => ({ addBucket, deleteBucket }));

    const setSelectedBucket = (bucket: Bucket) => {
        setSelectedBucketId(`${bucket.id}`)
        onBucketSelect(bucket)
    }

    const addBucket = (newBucket: Bucket) => {
        if (buckets && !buckets.find(b => b.id === newBucket.id)) {
            setBuckets([...buckets, newBucket]) // Optimitic UI
            setSelectedBucketId(`${newBucket.id}`)
            fetchBuckets(false, newBucket.id)
        }
    }

    const deleteBucket = (bucket: Bucket): boolean => {
        if (buckets && buckets.find(b => b.id === bucket.id)) {
            const newBuckets = buckets.filter(b => b.id !== bucket.id)
            setBuckets(newBuckets) // Optimitic UI
            if (newBuckets.length > 0) {
                setSelectedBucket(newBuckets[0])
                return false;
            }
        }
        return true;
    }

    const fetchBuckets = async (isFirstCall?: boolean, forceSelectId?: number) => {
        const response = await superagent.get(`${URL}/users/${user!.uuid}/buckets`)
            .set("Authorization", user!.token)
            .send()

        const apiResponse = response.body as ResponseApi<BucketsResponse>
        if (apiResponse.data) {
            const result = apiResponse.data.buckets
            setBuckets(result)
            if (result.length > 0) {
                if (isFirstCall) {
                    return setSelectedBucket(result[0])
                }
                const bucket = forceSelectId
                    ? result.find((b) => b.id === forceSelectId)
                    : undefined
                if (bucket) {
                    setSelectedBucket(bucket)
                }
            }
        } else {
            setBuckets([])
        }
    }

    const buildBuckets = () => {
        if (!buckets) return <></>
        if (buckets.length === 0) {
            return <Empty style={{marginTop: 24}} description="No Bucket found :/"/>
        }
        return buckets.map((e) => (
            <Menu.Item
                key={e.id}
                onClick={_ => setSelectedBucket(e)}
            >
                {e.name}
            </Menu.Item>
        ))
    }

    if (!buckets) {
        return <Spin />
    }

    return (
        <Menu
            mode="inline"
            selectedKeys={selectedBucketId ? [selectedBucketId] : []}
            style={{ height: '100%', borderRight: 0 }}
            onSelect={({ key }) => setSelectedBucketId(key)}
        >
            {buildBuckets()}
        </Menu>
    )
})

export default BucketList
