import React from 'react'
import PageContent from '../components/PageContent'
import { Card } from 'antd';
import { Link, useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();

    return (
        <PageContent title="Home" >
        <Card
            style={{ width: '10%', borderRadius: '15px', textAlign: "center", marginTop: "20px" }}
            onClick={() => history.push("/buckets")}
        >
                Buckets
        </Card>
    </PageContent>
    )
}

export default Home
