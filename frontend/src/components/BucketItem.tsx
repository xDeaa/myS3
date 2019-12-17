import React from 'react'

const BucketItemStyle: React.CSSProperties = {
    backgroundColor: "#F9F9F9",
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08)",
    padding: 22,
}

type BucketItemProps = {
    title: string,
    onClick: Function
}

const BucketItem = ({ title, onClick }: BucketItemProps) => {
    return (
        <div style={BucketItemStyle} onClick={(_) => onClick()}>
            <h3>{title}</h3>
        </div>
    )
}

export default BucketItem
