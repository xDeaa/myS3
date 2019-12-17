import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";

type NavBarProps = {
    isLogged: boolean
}

const NavBar = ({ isLogged }: NavBarProps) => (
    <Layout.Header aria-label="MyS3">
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item key="1">
                <Link to="/">MyS3</Link>
            </Menu.Item>
            <Menu.Item key="2" style={{ float: 'right' }}>
                <Link to={isLogged ? '/account' : '/login'}>
                    <Icon
                        type="user"
                        title={isLogged ? "My Account" : "Login"}
                    />
                </Link>
            </Menu.Item>
        </Menu>
    </Layout.Header>
)

export default NavBar
