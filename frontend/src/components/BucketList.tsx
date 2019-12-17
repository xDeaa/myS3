import React, { useState, useEffect } from 'react'
import { Menu, Spin, } from 'antd'
import superagent from 'superagent'
import Bucket from '../api/models/Bucket';
import { APIKEY, URL } from '../api/data';

type OnBucketSelect = (bucket: Bucket) => void;
type BucketListProps = {
    onBucketSelect: OnBucketSelect
}

const BucketList = ({ onBucketSelect }: BucketListProps) => {
    const [buckets, setBuckets] = useState<Bucket[]>()

    useEffect(() => {
        fetchBuckets()
    }, [])

    const fetchBuckets = async () => {
        const response = await superagent.get(`${URL}/users/b97cc746-201a-4b8b-bf12-5765d9e114db/buckets`)
            .set("Authorization", APIKEY)
            .send()

        // TODO: Add statusCode check
        const result: Bucket[] = response.body.data.buckets as Bucket[]
        setBuckets(result)
        if (result && result.length > 0) {
            onBucketSelect(result[0])
        }
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
            {buckets.map((e) => <Menu.Item key={e.id} onClick={_ => onBucketSelect(e)}>{e.name}</Menu.Item>)}
        </Menu>
    )
}

export default BucketList
