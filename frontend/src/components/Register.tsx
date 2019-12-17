import React from 'react'
import { FormComponentProps } from 'antd/lib/form';
import { Form, Icon, Input, Button, Tooltip } from "antd";

interface UserFormProps extends FormComponentProps {
    //email: string;
    //password: string;
}

const RegisterForm = (props: UserFormProps) => {
    const { getFieldDecorator } = props.form

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    const formItemLayout = {
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
    };

    return (
        <div style={{display: "flex" , justifyContent: "center"}}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ],
                    })(<Input
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                    />)
                    }
                </Form.Item>
                <Form.Item hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            }
                        ],
                    })(<Input.Password
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                    />)}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                    })(<Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="nickname"
                        placeholder="Nickname"
                    />,)}
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}> Register </Button>
                    Or <a href="">log in now!</a>
                </Form.Item>
            </Form>
        </div>
    );
}

const FormRegister = Form.create<UserFormProps>({ name: 'login' })(RegisterForm);

export default FormRegister
