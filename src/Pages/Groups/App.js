import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SliderButton from './SliderButton';
import AddDevicePage from '../Devices/AddDevicePage';
import Header from '../../AppHeader/Header';
import Help from '../userHelp/Help';
import Profile from '../userProfile/ProfilePage';
import '../../App.css';

/*
    Home page of the app. Displays the items in groups, 
    user can turn their devices on and off.
    users can connect new devices by navigating to the add device page
    users can create new groups by clicking the add group button
*/

const initialGroups = [
    { id: 'uncategorized', name: 'Uncategorized', devices: ['Device 1', 'Device 2'] },
    { id: 'bedroom', name: 'Bedroom', devices: ['Bed Lamp', 'Alarm Clock'] },
    { id: 'familyRoom', name: 'Family Room', devices: ['TV', 'Stereo System'] },
    { id: 'diningRoom', name: 'Dining Room', devices: ['Chandelier', 'Smart Speaker'] },
    { id: 'office', name: 'Office', devices: ['Desk Lamp', 'Computer', 'Printer'] },
    { id: 'outside', name: 'Outside', devices: ['Garden Lights', 'Pool Speaker'] }
];

function App() {

    let initialDeviceStatuses = {};

    initialGroups.forEach(group => {
        group.devices.forEach(device => {
            if (!initialDeviceStatuses[device] === undefined) {
                initialDeviceStatuses[device] = false; // Assuming all devices are initially off
            }
        });
    });

    const [deviceStatuses, setDeviceStatuses] = useState(initialDeviceStatuses);
    const [groups, setGroups] = useState(initialGroups);
    const [showDeviceManager, setShowDeviceManager] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [viewAllGroupDevices, setViewAllGroupDevices] = useState(null);

    const onDragOver = (event) => {
        event.preventDefault();
    }

    const onDragEndRemove = (deviceName) => {
        setGroups(prevGroups => prevGroups.map(group => {
            return {
                ...group,
                devices: group.devices.filter(device => device !== deviceName)
            };
        }));
        if (viewAllGroupDevices) {
            setViewAllGroupDevices(prev => ({
                ...prev,
                devices: prev.devices.filter(device => device !== deviceName)
            }));
        }
    };

    const onDrop = (groupId, event) => {
        const deviceName = event.dataTransfer.getData("deviceName");
        setGroups(prevGroups => prevGroups.map(group => {
            if (group.id === groupId) {
                return {
                    ...group,
                    devices: [...group.devices, deviceName]
                };
            } else {
                return {
                    ...group,
                    devices: group.devices.filter(device => device !== deviceName)
                };
            }
        }));
    }

    const onDragStart = (event, deviceName) => {
        event.dataTransfer.setData("deviceName", deviceName);
    }

    const addGroup = () => {
        const newGroupName = prompt("Enter new group name:");
        if (newGroupName) {
            const newGroupId = newGroupName.toLowerCase().replace(/\s+/g, '');
            setGroups([...groups, { id: newGroupId, name: newGroupName, devices: [] }]);
        }
    }

    const addGroupF = (groupName) => {
        if(groupName){
            const newGroupId = groupName.toLowerCase().replace(/\s+/g, '');
            setGroups([...groups, { id: newGroupId, name: groupName, devices: [] }]);
        }
    }
    
    const removeGroup = (groupId) => {
        setGroups(groups.filter(group => group.id !== groupId));
    }

    const editGroupName = (groupId, newName) => {
        if (!newName.trim()) {
            return;
        }

        setGroups(prevGroups =>
            prevGroups.map(group =>
                group.id === groupId ? { ...group, name: newName } : group
            )
        );
    };

    const addDeviceToGroup = (deviceName, groupName = 'Misc') => {
        setGroups(prevGroups => {
            return prevGroups.map(group => {
                if (group.name === groupName) {
                    return { ...group, devices: [...group.devices, deviceName] };
                }
                return group;
            });
        });
    };

    const toggleDeviceState = (deviceName) => {
        setDeviceStatuses(prevStatuses => ({
            ...prevStatuses,
            [deviceName]: !prevStatuses[deviceName]
        }));
    };

    const manageDevices = () => {
        setShowDeviceManager(!showDeviceManager);
        setSelectedDevice(null); // Reset selected device when toggling the device manager
    };

    const handleDeviceSelect = (deviceName) => {
        setSelectedDevice(deviceName);
    };

    const assignDeviceToGroup = (groupName) => {
        if (selectedDevice) {
            addDeviceToGroup(selectedDevice, groupName);
            setShowDeviceManager(false);
            setSelectedDevice(null);
        }
    };

    const handleViewAllClick = (groupId) => {
        const group = groups.find(group => group.id === groupId);
        setViewAllGroupDevices(group);
        setShowDeviceManager(true);
    };

    // Collect all devices for the manage devices list
    const allDevices = groups.flatMap(group => group.devices);

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <div className="App">
                        <Header />
                        <div className="group-controls">
                            <button className="add-group-button" onClick={addGroup}>Add Group</button>
                            <Link to="/add-device">
                                <button className="add-device-button">Add Device</button>
                            </Link>
                            <button className="manage-devices-button" onClick={manageDevices}>Manage Devices</button>
                        </div>

                        {showDeviceManager && (
                            <>
                                <div className="backdrop" onClick={() => { setShowDeviceManager(false); setViewAllGroupDevices(null); }}></div>
                                <div className="device-manager">
                                    {!selectedDevice && !viewAllGroupDevices && allDevices.map(device => (
                                        <div key={device} className="device-item" onClick={() => handleDeviceSelect(device)}>
                                            {device}
                                        </div>
                                    ))}
                                    {selectedDevice && (
                                        <div className="group-selector">
                                            {groups.map(group => (
                                                <div key={group.id} className="group-item" onClick={() => assignDeviceToGroup(group.name)}>
                                                    {group.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {viewAllGroupDevices && (
                                        <div className="view-all-devices">
                                            <h2>{viewAllGroupDevices.name} Devices</h2>
                                            {viewAllGroupDevices.devices.map(device => (
                                                <div key={device} className="device-item" draggable
                                                    onDragStart={(event) => onDragStart(event, device)}
                                                    onDragEnd={() => onDragEndRemove(device)}>
                                                    {device}
                                                    <SliderButton onClick={() => toggleDeviceState(device)}
                                                        initialState={deviceStatuses[device]}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        <div className="device-groups">
                            {groups.map(group => (
                                <div key={group.id} className="device-group" onDragOver={onDragOver} onDrop={(event) => onDrop(group.id, event)}>
                                    <input
                                        type="text"
                                        defaultValue={group.name}
                                        onBlur={(e) => editGroupName(group.id, e.target.value)}
                                    />
                                    {group.devices.map(device => (
                                        <div key={device} className="device" draggable onDragStart={(event) => onDragStart(event, device)}>
                                            {device}
                                            <SliderButton
                                                onClick={() => toggleDeviceState(device)}
                                                initialState={deviceStatuses[device]}
                                            />
                                        </div>
                                    ))}
                                    {group.devices.length > 3 && (
                                        <a href="#" className="view-all-link" onClick={(e) => { e.preventDefault(); handleViewAllClick(group.id); }}>View All</a>
                                    )}
                                    <button className="remove-group-button" onClick={() => removeGroup(group.id)}>Remove Group</button>
                                </div>
                            ))}
                        </div>
                    </div>
                } />
                <Route path="/add-device" element={
                    <AddDevicePage addDeviceToGroup={addDeviceToGroup}  addGroupF ={addGroupF} groups = {groups}/>
                    
                } />
                <Route path="/profile" element={<Profile />} />
                <Route path="/help" element={<Help />} />
            </Routes>
        </Router>
    );
}

export default App;