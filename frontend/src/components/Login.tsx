import React from 'react'
import { FormComponentProps } from 'antd/lib/form';
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { Link } from 'react-router-dom';
import BaseLoginRegister, { LoginValues } from './BaseLoginRegister';
import FormIcon from './FormIcon';

const LoginForm = (props: FormComponentProps<LoginValues>) => {
    const { getFieldDecorator } = props.form

    return (
        <BaseLoginRegister isLogin={true} form={props.form}>
            <Form.Item>
                {getFieldDecorator('email', {
                    rules: [
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'The input is not valid E-mail!' },
                    ],
                })(<Input prefix={<FormIcon icon="mail" />} placeholder="Email" />)}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(<Input prefix={<FormIcon icon="lock" />} type="password" placeholder="Password" />)}
            </Form.Item>
            <Form.Item>
                <Link style={{ float: 'right' }} to="/forgot_password">Forgot password</Link>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Log in</Button>
                Or <Link to="/register">register now!</Link>
            </Form.Item>
        </BaseLoginRegister>
    );
}

const FormLogin = Form.create<FormComponentProps<LoginValues>>({ name: 'login' })(LoginForm);

export default FormLogin