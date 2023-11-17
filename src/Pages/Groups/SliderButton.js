import React, { useState } from 'react';
import './SliderButton.css'; // Make sure to create this CSS file for styling

const SliderButton = ({ initialState = false, onToggle }) => {
    const [isOn, setIsOn] = useState(initialState);

    const toggleSwitch = () => {
        setIsOn(!isOn);
        if (onToggle) {
            onToggle(!isOn);
        }
    };

    return (
        <div className={`slider-button ${isOn ? 'on' : 'off'}`} onClick={toggleSwitch}>
            <div className="slider-circle"></div>
        </div>
    );
};

export default SliderButton;
