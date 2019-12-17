import React from 'react'
import { FormComponentProps } from 'antd/lib/form';
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { Link } from 'react-router-dom';

interface UserFormProps extends FormComponentProps {
    //email: string;
    //password: string;
}

const LoginForm = (props: UserFormProps) => {
    const { getFieldDecorator } = props.form

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a style={{ float: 'right' }} href="">
                        Forgot password
                    </a>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}> Log in </Button>
                    Or <Link to="/register">register now!</Link>
                </Form.Item>
            </Form>
        </div>
    );
}

const FormLogin = Form.create<UserFormProps>({ name: 'login' })(LoginForm);

export default FormLogin