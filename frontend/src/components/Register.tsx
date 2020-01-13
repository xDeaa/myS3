import React from 'react'
import { FormComponentProps } from 'antd/lib/form';
import { Form, Icon, Input, Button } from "antd";
import { Link } from 'react-router-dom';
import BaseLoginRegister, { RegisterValues } from './BaseLoginRegister';
import FormIcon from './FormIcon';

const RegisterForm = (props: FormComponentProps<RegisterValues>) => {
    const { getFieldDecorator } = props.form

    return (
        <BaseLoginRegister isLogin={false} form={props.form}>
            <Form.Item>
                {getFieldDecorator('email', {
                    rules: [
                        { type: 'email', message: 'The input is not valid E-mail!' },
                        { required: true, message: 'Please input your E-mail!' }],
                })(
                    <Input prefix={<FormIcon icon="mail" />} placeholder="Email" />
                )}
            </Form.Item>
            <Form.Item hasFeedback>
                {getFieldDecorator('password', {
                    rules: [
                        { required: true, message: 'Please input your password!' },
                        { min: 6, message: 'Your password must have 6 characters!' }
                    ],
                })(
                    <Input.Password prefix={<FormIcon icon="lock" />} type="password" placeholder="Password" />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('nickname', {
                    rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                })(
                    <Input prefix={<FormIcon icon="user" />} type="nickname" placeholder="Nickname" />
                )}
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Register</Button>
                Or <Link to="/login">log in now!</Link>
            </Form.Item>
        </BaseLoginRegister>
    );
}

const FormRegister = Form.create<FormComponentProps<RegisterValues>>({ name: 'register' })(RegisterForm);

export default FormRegister
