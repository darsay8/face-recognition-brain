import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn}) => {

    if (isSignedIn) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signout')}
                   className='b ph3 pv2 input-reset bg-blue white grow pointer f4 dib'>Sign Out</p>
            </nav>
        )

    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signin')}
                   className='b ph3 pv2 input-reset bg-blue white grow pointer f4 dib'>Sign in</p>
                <p onClick={() => onRouteChange('register')}
                   className='b ph3 pv2 input-reset bg-blue white grow pointer f4 dib'>Register</p>

            </nav>
        );
    }

};

export default Navigation;