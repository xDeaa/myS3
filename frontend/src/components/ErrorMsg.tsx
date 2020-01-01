import React from 'react'
import ErrorApi from '../api/models/ErrorApi'

type ErrorProps = {
    error?: ErrorApi
}

const ErrorMsg = ({ error }: ErrorProps) => {
    if (!error) {
        return <></>
    }

    return (
        <div className="has-error" style={{ marginBottom: 16 }}>
            <p className="ant-form-explain">{error.message}</p>
        </div>
    )
}

export default ErrorMsg
