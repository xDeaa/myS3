import React from 'react';
import NavBar from './components/NavBar';
import { Layout } from 'antd'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import BucketsPage from './pages/BucketsPage';
import Page404 from './pages/Page404';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';



const App = () => (
  <Router>
    <Layout className="layout">
      <NavBar isLogged={false} />
      <Layout.Content style={{ padding: '0 50px' }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/buckets" component={BucketsPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/account" component={Home} />
          <Route path="*" component={Page404} />
        </Switch>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        MyS3 ©2019
      </Layout.Footer>
    </Layout>
  </Router>
)

export default App;
