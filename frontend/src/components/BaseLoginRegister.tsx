import React, { useState, useContext } from 'react'
import { Form } from 'antd'
import { useHistory } from 'react-router-dom'
import superagent from 'superagent'
import ErrorApi from '../api/models/ErrorApi'
import User from '../api/models/User'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import ResponseApi from '../api/models/ResponseApi'
import { URL } from '../api/data'
import ErrorMsg from './ErrorMsg'
import UserContext from '../contexts/UserContext'

export interface LoginValues {
    email: string
    password: string
}

export interface RegisterValues extends LoginValues {
    nickname: string
}

type BaseLoginRegisterProps = {
    isLogin: boolean
    form: WrappedFormUtils<LoginValues>
}

const BaseLoginRegister: React.FC<BaseLoginRegisterProps> = (props) => {
    const { setUser } = useContext(UserContext)
    const [error, setError] = useState<ErrorApi>()
    const history = useHistory()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                if (props.isLogin) {
                    executeRequest(values)
                } else {
                    executeRequest(values as RegisterValues)
                }
            }
        });
    };

    const executeRequest = async (values: LoginValues) => {
        const response = await superagent
            .post(`${URL}/auth/${props.isLogin ? 'login' : 'register'}`)
            .ok(() => true)
            .send(values)

        const apiResponse = response.body as ResponseApi<User>;

        if (apiResponse.error) {
            setError(apiResponse.error)
            setUser(undefined)
        } else {
            setError(undefined);
            setUser(apiResponse.data)
            history.push('/buckets')
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Form onSubmit={handleSubmit} style={{ minWidth: 300 }}>
                <ErrorMsg error={error} />
                {props.children}
            </Form>
        </div>
    );
}

export default BaseLoginRegister;