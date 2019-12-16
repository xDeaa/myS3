import React from "react";
import { User20 } from "@carbon/icons-react";
import { Header, HeaderName, HeaderGlobalAction, HeaderGlobalBar } from "carbon-components-react";

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

    const renderActions = () => (
        <HeaderGlobalAction aria-label={isLogged ? "My Account" : "Login"} onClick={isLogged ? onUserClick : onLoginClick}>
            <User20 />
        </HeaderGlobalAction>
    )

    return (
        <Header aria-label="MyS3">
            <HeaderName href="/" prefix="">
                MyS3
                </HeaderName>
            <HeaderGlobalBar>
                {renderActions()}
            </HeaderGlobalBar>
        </Header>
    );
}

export default NavBar
