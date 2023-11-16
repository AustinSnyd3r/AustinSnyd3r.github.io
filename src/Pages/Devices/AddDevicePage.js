import React, { useState } from 'react';
import Header from '../../AppHeader/Header';
import '../../App.css';

function AddDevicePage() {
    const [selectedDevice, setSelectedDevice] = useState('');
    const [groupName, setGroupName] = useState('');

    const handleDeviceSelect = (deviceName) => {
        setSelectedDevice(deviceName);
    };

    const handleAddDevice = () => {
        // Logic to add the device to a group goes here
        // This could involve calling a function passed down from a parent component
        console.log(`Adding ${selectedDevice} to ${groupName || 'Misc'} group`);
        // Reset the selections after adding
        setSelectedDevice('');
        setGroupName('');
    };

    return (
        <div className="App">
            <Header />
            <div className="main-content">
                <h2>Select a Device</h2>
                <button onClick={() => handleDeviceSelect('Device A')}>Device A</button>
                <button onClick={() => handleDeviceSelect('Device B')}>Device B</button>
                <button onClick={() => handleDeviceSelect('Device C')}>Device C</button>

                <div>
                    <h3>Selected Device: {selectedDevice}</h3>
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Enter Group Name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                    <button onClick={handleAddDevice}>Add Device</button>
                </div>
            </div>
        </div>
    );
}

export default AddDevicePage;
