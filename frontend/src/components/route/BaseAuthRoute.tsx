import React, { useContext } from 'react'
import { Route, Redirect, RouteProps, useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

interface BaseRouteAuthProps extends RouteProps {
    redirectPath: string;
    needUser: boolean
}

const BaseAuthRoute: React.FC<BaseRouteAuthProps> = ({ redirectPath, needUser, children, ...rest }) => {
    const userContext = useContext(UserContext)
    const { location } = useHistory()

    const isRedirect = (): boolean => {
        if (needUser && userContext.user === undefined) {
            return true;
        }
        if (!needUser && userContext.user !== undefined) {
            return true
        }
        return false;
    }

    if (isRedirect()) {
        return <Redirect to={{ pathname: redirectPath, state: { from: location } }} />
    }
    return <Route {...rest} />
}

export default BaseAuthRoute