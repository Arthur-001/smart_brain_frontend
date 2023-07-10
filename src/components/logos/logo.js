import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './logo.css';

const Logo = () => {
    return (
        <Tilt className="Tilt shadow-2 br2" style={{ height: '150px', width: '150px', }}>
            <div style={{}}>
                <img alt='logo' src={brain} />
            </div>
        </Tilt>
    )
}

export default Logo;