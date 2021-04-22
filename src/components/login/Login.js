import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

export function Login() {

    const { loginWithRedirect, logout } = useAuth0();

    return (
        <div>
            <LoginButton />
            <LogoutButton />
        </div>
    );
};

export function LoginButton() {

    const { loginWithRedirect } = useAuth0();

    return (
        <button onClick={() => loginWithRedirect()}>Log in</button>
    );
};

export function LogoutButton() {

    const { logout } = useAuth0();

    return (
        <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
    );
};
