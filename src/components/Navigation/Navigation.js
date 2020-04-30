import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {

    if (isSignedIn) {
        return (
            <nav className="navigation">
                <p onClick={() => onRouteChange('signout')}><a>Sign Out</a></p>

            </nav>
        );
    } else {
        return (
            <nav className="navigation">
                <p onClick={() => onRouteChange('register')}><a>Register</a></p>
                <p onClick={() => onRouteChange('signin')}><a>Sign In</a></p>

            </nav>
        );
    }
}

export default Navigation;