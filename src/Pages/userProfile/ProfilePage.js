import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../AppHeader/Header';
import './ProfilePage.css';


function Profile() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [deviceName, setDeviceName] = useState('');
    const [updated, setUpdated] = useState({
        username: false,
        password: false,
        deviceName: false,
    });

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setUpdated((prevState) => ({ ...prevState, username: false }));
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setUpdated((prevState) => ({ ...prevState, password: false }));
    };

    const handleDeviceNameChange = (event) => {
        setDeviceName(event.target.value);
        setUpdated((prevState) => ({ ...prevState, deviceName: false }));
    };

    const handleUpdate = (field) => {
        setUpdated((prevState) => ({ ...prevState, [field]: true }));

        // Clear the corresponding input field
        switch (field) {
            case 'username':
                setUsername('');
                break;
            case 'password':
                setPassword('');
                break;
            case 'deviceName':
                setDeviceName('');
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Header />
            </div>
            <div className="profile-page">
                <h2>Profile:</h2>
                <div className="input-container">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Enter your username"
                    />
                    <button className="update-button" onClick={() => handleUpdate('username')}>
                        Update
                    </button>
                    {updated.username && <p>Username updated successfully!</p>}
                </div>
                <div className="input-container">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter your password"
                    />
                    <button className="update-button" onClick={() => handleUpdate('password')}>
                        Update
                    </button>
                    {updated.password && <p>Password updated successfully!</p>}
                </div>
                <div className="input-container">
                    <label>Device Name:</label>
                    <input
                        type="text"
                        value={deviceName}
                        onChange={handleDeviceNameChange}
                        placeholder="Enter device name"
                    />
                    <button className="update-button" onClick={() => handleUpdate('deviceName')}>
                        Update
                    </button>
                    {updated.deviceName && <p>Device name updated successfully!</p>}
                </div>
            </div>
            <button className="home-button" onClick={() => navigate('/')}>
                Return Home
            </button>
        </div>
    );
}

export default Profile;
