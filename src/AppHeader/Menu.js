import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Adjust path if needed

function Menu() {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <>
            <div className="menu-icon" onClick={toggleMenu}>
                &#9776;
            </div>
            {menuVisible && (
                <div className="backdrop" onClick={toggleMenu}>
                    <div className={`slide-out-menu ${menuVisible ? 'open' : ''}`}>
                        <div className="menu-header">
                            <button className="close-menu" onClick={toggleMenu}>&times;</button>
                        </div>
                        <div className="menu-items">
                            <Link to="/" className="menu-item-link">
                                <button className="menu-item">Device Management</button>
                            </Link>
                            <Link to="/add-device" className="menu-item-link">
                                <button className="menu-item">Add Device</button>
                            </Link>
                            <button className="menu-item">Help</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Menu;
