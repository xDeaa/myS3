import React from 'react';
import NavBar from './components/NavBar';
import { Layout } from 'antd'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, BucketsPage, LoginPage, RegisterPage, Page404 } from './pages';
import { UserProvider } from './contexts/UserContext';
import { AuthRoute, NotAuthRoute } from './components/route';
import User from './api/models/User';
import DisconnectPage from './pages/DisconnectPage';
import ForgotPassPage from './pages/ForgotPassPage';
import { QueryParamProvider } from 'use-query-params';

const App = () => {
  const getUserInStorage = (): User | undefined => {
    const userStorageStr = localStorage.getItem('user');
    if (!userStorageStr) {
      return
    }
    return JSON.parse(userStorageStr) as User
  }

  return (
    <UserProvider userInStorage={getUserInStorage()}>
      <Router>
        <Layout className="layout">
          <NavBar />
          <Layout.Content style={{ padding: '0 50px', minHeight: '100vh' }}>
            <QueryParamProvider ReactRouterRoute={Route}>
              <Switch>
                <AuthRoute exact path="/" component={Home} />
                <AuthRoute exact path="/buckets" component={BucketsPage} />
                <AuthRoute exact path="/account" component={Home} />
                <AuthRoute exact path="/disconnect" component={DisconnectPage} />
                <NotAuthRoute exact path="/login" component={LoginPage} />
                <NotAuthRoute exact path="/register" component={RegisterPage} />
                <NotAuthRoute exact path="/forgot_password" component={ForgotPassPage} />
                <Route path="*" component={Page404} />
              </Switch>
            </QueryParamProvider>
          </Layout.Content>
        </Layout>
      </Router>
    </UserProvider>
  )
}

export default App
