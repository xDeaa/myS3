import React, { useContext } from "react";
import { Layout, Menu, Icon, Dropdown } from "antd";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const NavBar = () => {
    const { user } = useContext(UserContext)

    const buildUserDropdown = () => {
        if (user === undefined) {
            return <Menu theme="dark" mode="vertical">
                <Menu.Item key="1">
                    <Link to="/login">Login</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/register">Register</Link>
                </Menu.Item>
            </Menu>
        }
        return <Menu theme="dark" mode="vertical">
            <Menu.Item key="1">
                <Link to="/account">Account</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/disconnect">Disconnect</Link>
            </Menu.Item>
        </Menu>
    }

    return (
        <Layout.Header aria-label="MyS3">
            <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
                <Menu.Item key="1">
                    <Link to="/">MyS3</Link>
                </Menu.Item>
                <div style={{ float: 'right' }}>
                    <Dropdown overlay={buildUserDropdown()} placement="bottomLeft">
                        <Icon
                            type="user"
                            title={user !== undefined ? "My Account" : "Login"}
                        />
                    </Dropdown>
                </div>
            </Menu>
        </Layout.Header>
    )
}

export default NavBar
