import React from 'react'
import BucketItem from './BucketItem'

type BucketListProps = {

}

const BucketList = (props: BucketListProps) => {
    const renderTestBuckets = ["Bucket 1", "Bucket test", "Images", "All PDF", "Bucket 1", "Bucket test", "Images", "All PDF", "Bucket 1", "Bucket test", "Images", "All PDF"]

    return (
        <div className="bx--grid" style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
            <div className="bx--row">
                {renderTestBuckets.map(e => <BucketItem title={e} onClick={() => console.log("SAlut")} />)}
            </div>
        </div>
    )
}

export default BucketList
