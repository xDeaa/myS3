import React, { useState } from 'react'
import { FormComponentProps } from 'antd/lib/form';
import { Form, Icon, Input, Button, Checkbox, message} from "antd";
import { Link, Redirect } from 'react-router-dom';
import superagent from 'superagent'
import { URL } from '../api/data';
import User from '../api/models/User';

const LoginForm = (props: FormComponentProps) => {
    const [user, setUser] = useState<User>()
    const [connected, setConnected] = useState(false)
    const { getFieldDecorator, getFieldValue } = props.form
    
    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                const { email, password } = values        
                login(email, password)
            }
        });
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await superagent.post(`${URL}/auth/login`)
            .set( "Content-Type", "application/x-www-form-urlencoded")
            .send({email, password})
           // const { token, uuid, nickame } = response.body.data
            const result : User = response.body.data as User
            setUser(result)
            setConnected(true)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!'},
                        {type: 'email', message: 'The input is not valid E-mail!'},],
                    })(
                        <Input
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!'}],
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
            {
            connected ? (<Redirect to={{
                pathname: '/buckets',
                state: { user }
            }}/> ) : <></>
            }
        </div>
    );
}

const FormLogin = Form.create<FormComponentProps>({})(LoginForm);

export default FormLogin