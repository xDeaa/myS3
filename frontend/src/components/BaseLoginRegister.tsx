import React, { useState } from 'react'
import { Form } from 'antd'
import { Redirect } from 'react-router-dom'
import superagent from 'superagent'
import ErrorApi from '../api/models/ErrorApi'
import User from '../api/models/User'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import ResponseApi from '../api/models/ResponseApi'
import { URL } from '../api/data'

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
    const [error, setError] = useState<ErrorApi>()
    const [user, setUser] = useState<User>()
    const [isLogged, setLogged] = useState<boolean>(false)

    const handleSubmit = (e: any) => {
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
            setLogged(false)
        } else {
            setError(undefined);
            setUser(apiResponse.data)
            setLogged(true)
        }
    }

    if (isLogged) {
        return <Redirect to={{ pathname: '/buckets', state: { user } }} />
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
                {error && (
                    <div className="has-error" style={{ marginBottom: 16 }}>
                        <p className="ant-form-explain">{error.message}</p>
                    </div>
                )}
                {props.children}
            </Form>
        </div>
    );
}

export default BaseLoginRegister;