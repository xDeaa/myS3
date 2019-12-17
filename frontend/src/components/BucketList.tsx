import React, { useState, useEffect } from 'react'
import { Menu, Spin, } from 'antd'
import Bucket from '../api/models/Bucket';

type OnBucketSelect = (bucket: number) => void;
type BucketListProps = {
    onBucketSelect: OnBucketSelect
}



const BucketList = ({ onBucketSelect }: BucketListProps) => {
    const [buckets, setBuckets] = useState<Bucket[]>()

    useEffect(() => {
        //fetchBuckets()
    }, [])

    const fetchBuckets = async () => {
        // TODO: Fetch buckets
        setBuckets([
            { id: 1, name: "Bucket One" },
            { id: 2, name: "Bucket Two" },
            { id: 3, name: "Bucket Three" },
        ])
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
            {buckets.map((e) => <Menu.Item key={e.id} onClick={_ => onBucketSelect(e.id)}>{e.name}</Menu.Item>)}
        </Menu>
    )
}

export default BucketList
