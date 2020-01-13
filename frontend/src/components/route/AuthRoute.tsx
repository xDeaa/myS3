import React from 'react'
import BaseAuthRoute from './BaseAuthRoute';
import { RouteProps } from 'react-router-dom';

const AuthRoute: React.FC<RouteProps> = ({ children, ...rest }) => (
    <BaseAuthRoute {...rest} redirectPath="/login" needUser />
)

export default AuthRoute