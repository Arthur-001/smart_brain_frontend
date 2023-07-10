import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p
                    className='f3 link dim white underline pa3 pointer'
                    onClick={() => onRouteChange('signout')}  //! () => arrow function should be used here because we want to run this function when the user clicked on the button not when the page is rendered.
                >
                    Sign Out
                </p>
            </nav>
        )
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p
                    className='f3 link dim white underline pa3 pointer'
                    onClick={() => onRouteChange('signin')} >
                    Sign In
                </p>
                <p
                    className='f3 link dim white underline pa3 pointer'
                    onClick={() => onRouteChange('register')} >
                    Register
                </p>
            </nav>
        )
    }
}

export default Navigation;