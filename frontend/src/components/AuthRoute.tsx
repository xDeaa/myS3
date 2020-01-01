import React, { useContext } from 'react'
import { Route, Redirect, RouteProps, useHistory } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const AuthRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    const userContext = useContext(UserContext)
    const { location } = useHistory()

    if (userContext.user === undefined) {
        return <Redirect to={{ pathname: "/login", state: { from: location } }} />
    }
    return <Route {...rest} />
}

export default AuthRoute