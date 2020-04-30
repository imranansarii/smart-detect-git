import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import alien from './alien.png';
const Logo = () => {
    return (
        <div>
            <Tilt className="Tilt" options={{ max: 120, perspective: 200,speed: 100 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner" >
                    <img src={alien} alt='logo' style={{ height: '50px', width: '50px' }} />
                    <h4>IMRAN</h4>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;