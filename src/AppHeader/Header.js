import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import '../App.css';

function Header() {
    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        console.log('Menu visibility changed: ${menuVisible}');
    }, [menuVisible]);

    const toggleMenu = () => {
        setMenuVisible(prevMenuVisible => !prevMenuVisible);
    };

    return (
        <header className="App-header">
            <div className="menu-icon" onClick={toggleMenu}>
                &#9776;
            </div>
            BlueSpace
            {menuVisible && <Menu toggleMenu={toggleMenu} />}
        </header>
    );
}

export default Header;
