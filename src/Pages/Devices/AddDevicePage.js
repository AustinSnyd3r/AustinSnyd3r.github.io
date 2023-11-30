import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../AppHeader/Header';
import '../../App.css';

/*  
    This is the AddDevicePage, this is where users are able to add
    devices to groups, or make new groups to add devices.
    It currently has hardcoded devices, these are to mimic
    bluetooth detected devices that the user can pair
*/
function AddDevicePage({ addDeviceToGroup, addGroupF, groups }) {
    const [selectedDevice, setSelectedDevice] = useState('');
    const [groupName, setGroupName] = useState('');
    const navigate = useNavigate();

    const handleDeviceSelect = (deviceName) => {
        setSelectedDevice(deviceName);
    };

    const handleAddDevice = () => {
        //input validation
        if (!selectedDevice) {
            alert('Please select a device');
            return;
        }

        if (!groupName) {
            addDeviceToGroup(selectedDevice, "Uncategorized");
        }
        else{
            const existingGroup = groups.find(group => group.name === groupName);

            // Logic to add the device to a group goes here
            console.log(`Adding ${selectedDevice} to ${groupName} group`);
            //add device to existing group or make one
            if(existingGroup){
                addDeviceToGroup(selectedDevice, groupName);
            }
            else{
                addGroupF(groupName);
                addDeviceToGroup(selectedDevice, groupName);
            }
        }

        
        alert(`Added ${selectedDevice} to ${groupName || 'Uncategorized'} group`);
        
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
            <button className="home-button" onClick={() => navigate('/')}>
                Return Home
            </button>
        </div>
    );
}

export default AddDevicePage;