import React from 'react';
import NavBar from './components/NavBar';
import { Layout } from 'antd'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, BucketsPage, LoginPage, RegisterPage, Page404 } from './pages';
import { UserProvider } from './contexts/UserContext';
import AuthRoute from './components/AuthRoute';

const App = () => (
  <UserProvider>
    <Router>
      <Layout className="layout">
        <NavBar isLogged={false} />
        <Layout.Content style={{ padding: '0 50px' }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/buckets" component={BucketsPage} />
            <AuthRoute exact path="/account" component={Home} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route path="*" component={Page404} />
          </Switch>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          MyS3 ©2019
      </Layout.Footer>
      </Layout>
    </Router>
  </UserProvider>
)

export default App;
