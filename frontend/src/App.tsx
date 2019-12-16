import React from 'react';
import NavBar from './components/NavBar';
import { Content } from 'carbon-components-react'
import BucketList from './components/BucketList';

const App = () => {
  return (
    <>
      <NavBar isLogged={false} />
      <Content id="main-content">
        <h1>Buckets</h1>
        <BucketList />
      </Content>
    </>
  );
}

export default App;
