import React, { useState, useContext } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import { WrappedFormUtils, FormComponentProps } from 'antd/lib/form/Form';
import Bucket from '../api/models/Bucket';
import superagent from 'superagent'
import ResponseApi from '../api/models/ResponseApi';
import ErrorApi from '../api/models/ErrorApi';
import ErrorMsg from './ErrorMsg';
import { URL } from '../api/data';
import UserContext from '../contexts/UserContext';
import BucketResponse from '../api/response/BucketResponse';

interface AddNewBucketValues {
    bucketname: string
}

interface AddNewBucketFormProps extends FormComponentProps {
    form: WrappedFormUtils<AddNewBucketValues>
    onNewBucket: (bucket: Bucket) => void
}

const AddNewBucketForm: React.FC<AddNewBucketFormProps> = ({ form, onNewBucket }) => {
    const { getFieldDecorator, getFieldError, setFields, isFieldTouched } = form;
    const [error, setError] = useState<ErrorApi>()
    const [isLoading, setLoading] = useState<boolean>(false)
    const { user } = useContext(UserContext)

    const addNewBucket = async (name: string): Promise<void> => {
        setLoading(true)
        
        const response = await superagent
        .post(`${URL}/users/${user!.uuid}/buckets`)
        .set("Authorization", user!.token)
        .ok(() => true)
        .send({ name })
        
        const apiResponse = response.body as ResponseApi<BucketResponse>;
        
        setLoading(false)
        if (apiResponse.data) {
            setError(undefined);
            setFields({ 'bucketname': '' })
            onNewBucket(apiResponse.data.bucket)
        } else {
            setError(apiResponse.error)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                addNewBucket(values.bucketname)
            }
        });
    };

    // Only show error after a field is touched.
    const bucketNameError = isFieldTouched('bucketname') && getFieldError('bucketname');

    return (
        <Form layout="inline" onSubmit={handleSubmit}>
            <ErrorMsg error={error} />
            <Form.Item validateStatus={bucketNameError ? 'error' : ''} help={bucketNameError || ''}>
                {getFieldDecorator('bucketname', {
                    rules: [{ required: true, message: 'Please input a bucket name !' }],
                })(
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Bucket name"
                    />
                )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>Add</Button>
            </Form.Item>
        </Form>
    );
}

export default Form.create<AddNewBucketFormProps>({ name: 'add_new_bucket' })(AddNewBucketForm);