import React from 'react';
import NavBar from './components/NavBar';
import BucketList from './components/BucketList';
import { Layout, Breadcrumb } from 'antd'

const App = () => {
  return (
    <Layout className="layout">
      <NavBar isLogged={false} />
      <Layout.Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <h1>Buckets</h1>
        <BucketList />
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Layout.Footer>
    </Layout>
  );
}

export default App;
