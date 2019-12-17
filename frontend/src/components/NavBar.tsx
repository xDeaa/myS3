import React from "react";
import { Layout, Menu, Icon } from "antd";

type NavBarProps = {
    isLogged: boolean
}

const NavBar = ({ isLogged }: NavBarProps) => {
    const onUserClick = () => {
        console.log("User");
    }

    const onLoginClick = () => {
        console.log("Login");
    }

    return (
        <Layout.Header aria-label="MyS3">
            <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
                <Menu.Item key="1">
                    MyS3
                </Menu.Item>
                <Menu.Item key="2" style={{ float: 'right' }}>
                    <Icon
                        type="user"
                        title={isLogged ? "My Account" : "Login"}
                        onClick={isLogged ? onUserClick : onLoginClick}
                    />
                </Menu.Item>
            </Menu>
        </Layout.Header>
    );
}

export default NavBar
