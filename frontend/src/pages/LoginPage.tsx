import React, { useState } from 'react'
import PageContent from '../components/PageContent'
import FormLogin from '../components/Login';

const LoginPage = () => {
    return (
        <PageContent title="Login">
            <FormLogin />
        </PageContent>
    )
}

export default LoginPage
