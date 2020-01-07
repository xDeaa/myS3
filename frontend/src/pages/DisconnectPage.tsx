import React, { useEffect, useContext } from 'react'
import { Result, Spin } from 'antd'
import { useHistory } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

const DisconnectPage = () => {
    const history = useHistory()
    const userContext = useContext(UserContext)

    useEffect(() => {
        setTimeout(() => {
            userContext.setUser(undefined)
            history.push('/')
        }, 1500)
    })

    return <Result icon={<Spin />} title="Disconnecting..." />
}

export default DisconnectPage
