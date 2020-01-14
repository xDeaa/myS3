import React, { useState, useEffect } from 'react'
import { Form, message, Input, Icon, Button, Spin } from 'antd'
import superagent from 'superagent'
import ErrorApi from '../api/models/ErrorApi'
import { WrappedFormUtils, FormComponentProps } from 'antd/lib/form/Form'
import ResponseApi from '../api/models/ResponseApi'
import { URL } from '../api/data'
import PageContent from '../components/PageContent'
import ErrorMsg from '../components/ErrorMsg'
import { Link, useHistory } from 'react-router-dom'
import { useQueryParam, StringParam } from 'use-query-params';
import FormIcon from '../components/FormIcon'

export interface ForgotCreateValues {
    email: string
}

export interface ForgotUpdateValues {
    password: string
    password_confirm: string
}

type BaseLoginRegisterProps = {
    form: WrappedFormUtils<ForgotCreateValues | ForgotUpdateValues>
}

const ForgotPassPage: React.FC<BaseLoginRegisterProps> = (props) => {
    const [isAllowed, setAllowed] = useState<boolean>(false)
    const [error, setError] = useState<ErrorApi>()
    const [isLoading, setLoading] = useState(false)

    const history = useHistory();
    const [token] = useQueryParam('token', StringParam);
    const { getFieldValue, getFieldDecorator, resetFields } = props.form

    useEffect(() => {
        if (token) {
            checkToken();
        } else {
            setAllowed(true);
        }
    }, [])

    const checkToken = async () => {
        const response = await superagent
            .get(`${URL}/forgot_password?token=${token}`)
            .ok(() => true)
            .send()

        const apiResponse = response.body as ResponseApi<any>;

        if (apiResponse.error) {
            message.error('You are not allowed to access to forgot password page !')
            history.push('/login')
        } else {
            setAllowed(true)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (!err) {
                setLoading(true);
                if (token) {
                    await updatePasswordUser(values as ForgotUpdateValues)
                } else {
                    await createForgotPassword(values as ForgotCreateValues)
                }
                setLoading(false);
            }
        });
    };

    const createForgotPassword = async ({ email }: ForgotCreateValues): Promise<void> => {
        const response = await superagent
            .post(`${URL}/forgot_password`)
            .ok(() => true)
            .send({ email })

        const apiResponse = response.body as ResponseApi<any>;

        setError(apiResponse.error)
        if (apiResponse.data) {
            resetFields()
            message.success('Check your email inbox, you should received an email soon !')
        }
    }

    const updatePasswordUser = async ({ password }: ForgotUpdateValues): Promise<void> => {
        const response = await superagent
            .put(`${URL}/forgot_password`)
            .ok(() => true)
            .send({ token, password })

        const apiResponse = response.body as ResponseApi<any>;

        setError(apiResponse.error)
        if (apiResponse.data) {
            message.success('Your password has been successfully updated !')
            history.push('/login');
        }
    }

    return (
        <PageContent title="Forgot Password">
            <div style={{ display: "flex", justifyContent: "center" }}>
                {!isAllowed && <Spin />}
                {isAllowed && (
                    <Form onSubmit={handleSubmit} style={{ minWidth: 300 }}>
                        <ErrorMsg error={error} />
                        {!token && (
                            <Form.Item>
                                {getFieldDecorator('email', {
                                    rules: [
                                        { required: true, message: 'Please input your email!' },
                                        { type: 'email', message: 'The input is not valid E-mail!' },
                                    ],
                                })(<Input prefix={<FormIcon icon="mail" />} placeholder="Email" />)}
                            </Form.Item>
                        )}
                        {token && (
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [
                                        { required: true, message: 'Please input your new password!' },
                                        { type: 'string', message: 'The input must have minimum 6 characters', min: 6 },
                                    ],
                                })(<Input prefix={<FormIcon icon="lock" />} type="password" placeholder="New password" />)}
                            </Form.Item>
                        )}
                        {token && (
                            <Form.Item>
                                {getFieldDecorator('password_confirm', {
                                    rules: [
                                        {
                                            required: true, validator: (_, value, callback) => {
                                                const isDiff = getFieldValue('password') !== value;
                                                callback(isDiff ? 'Password confirm is not identical' : undefined)
                                            }
                                        }
                                    ],
                                })(<Input prefix={<FormIcon icon="lock" />} type="password" placeholder="New password confirm" />)}
                            </Form.Item>
                        )}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={isLoading}>
                                {token ? 'Reset password' : 'Send email'}
                            </Button>
                            Or <Link to="/login">go back</Link>
                        </Form.Item>
                    </Form>
                )}
            </div>
        </PageContent>
    );
}

export default Form.create<FormComponentProps<ForgotCreateValues | ForgotUpdateValues>>({ name: 'forgotpass' })(ForgotPassPage);;