﻿import React, { useState } from 'react';
import Header from '../../AppHeader/Header';
import '../../App.css';

/*  
    This is the AddDevicePage, this is where users are able to add
    devices to groups, or make new groups to add devices.
    It currently has hardcoded devices, these are to mimic
    bluetooth detected devices that the user can pair
*/
function AddDevicePage({ addDeviceToGroup, addGroupF }) {
    const [selectedDevice, setSelectedDevice] = useState('');
    const [groupName, setGroupName] = useState('');

    const handleDeviceSelect = (deviceName) => {
        setSelectedDevice(deviceName);
    };

    const handleAddDevice = () => {
        //input validation
        if (!selectedDevice) {
            alert('Please select a device');
            return;
        }

        // Logic to add the device to a group goes here
        console.log(`Adding ${selectedDevice} to ${groupName} group`);
        //add device to existing group or make one
        addDeviceToGroup(selectedDevice, groupName || selectedDevice, addGroupF(groupName));
        
        alert(`Added ${selectedDevice} to ${groupName || 'Misc'} group`);
        
        // Reset the selections after adding
        setSelectedDevice('');
        setGroupName('');
    };

    return (
        <div className="App">
            <Header />
            <div className="main-content">
                <h2>Select a Device</h2>
                <button className="deviceButton" onClick={() => handleDeviceSelect('Device A')}>Device A</button>
                <button className="deviceButton" onClick={() => handleDeviceSelect('Device B')}>Device B</button>
                <button className="deviceButton" onClick={() => handleDeviceSelect('Device C')}>Device C</button>

                <div>
                    <h3>Selected Device: {selectedDevice}</h3>
                </div>

                <div>
                    <input
                        className="groupNameInput"
                        type="text"
                        placeholder="Enter Group Name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                    <button className="addBtn" onClick={handleAddDevice}>Add Device</button>
                </div>
            </div>
        </div>
    );
}

export default AddDevicePage;