import React from 'react'
import BaseAuthRoute from './BaseAuthRoute';
import { RouteProps } from 'react-router-dom';

const NotAuthRoute: React.FC<RouteProps> = ({ children, ...rest }) => (
    <BaseAuthRoute {...rest} redirectPath="/" needUser={false} />
)

export default NotAuthRoute