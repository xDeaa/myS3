import React from 'react';
import { Icon } from 'antd';

type FormIconProps = {
    icon: string
}

const FormIcon = ({ icon }: FormIconProps) => (
    <Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />
)

export default FormIcon