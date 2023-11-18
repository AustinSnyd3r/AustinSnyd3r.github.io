import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SliderButton from './SliderButton';
import AddDevicePage from '../Devices/AddDevicePage';
import Header from '../../AppHeader/Header';
import Profile from '../userProfile/ProfilePage';
import '../../App.css';

function App() {
    const [groups, setGroups] = useState({
        Bedroom: [],
        FamilyRoom: [],
        Misc: ['Device 1', 'Device 2', 'Device 3']
    });

    const onDragOver = (event) => {
        event.preventDefault();
    }

    const onDrop = (groupName, event) => {
        const deviceName = event.dataTransfer.getData("deviceName");
        const newGroups = { ...groups };
        Object.keys(groups).forEach(group => {
            newGroups[group] = newGroups[group].filter(device => device !== deviceName);
        });
        newGroups[groupName].push(deviceName);
        setGroups(newGroups);
    }

    const onDragStart = (event, deviceName) => {
        event.dataTransfer.setData("deviceName", deviceName);
    }

    const addGroup = () => {
        const newGroupName = prompt("Enter new group name:");
        if (newGroupName && !groups[newGroupName]) {
            setGroups({ ...groups, [newGroupName]: [] });
        }
    }

    const removeGroup = (groupName) => {
        const { [groupName]: _, ...newGroups } = groups;
        setGroups(newGroups);
    }

    const editGroupName = (oldName, newName) => {
        const { [oldName]: devices, ...rest } = groups;
        setGroups({ ...rest, [newName]: devices });
    }

    const addDeviceToGroup = (deviceName, groupName = 'Misc') => {
        setGroups(prevGroups => {
            const newGroups = { ...prevGroups };
            if (!newGroups[groupName]) newGroups[groupName] = [];
            newGroups[groupName].push(deviceName);
            return newGroups;
        });
    };

    const [deviceStatuses, setDeviceStatuses] = useState({});

    const toggleDeviceState = (groupName, deviceName) => {
        setDeviceStatuses(prevStatuses => ({
            ...prevStatuses,
            [deviceName]: !prevStatuses[deviceName]
        }));
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <div className="App">
                        <Header /> {/* Header component */}
                        <div className="group-controls">
                            <button className="add-group-button" onClick={addGroup}>Add Group</button>
                            <Link to="/add-device">
                                <button className="add-device-button">Add Device</button>
                            </Link>
                        </div>
                        <div className="device-groups">
                            {Object.keys(groups).map((groupName, index) => (
                                <div key={index}
                                    className="device-group"
                                    onDragOver={onDragOver}
                                    onDrop={(event) => onDrop(groupName, event)}>
                                    <input
                                        type="text"
                                        defaultValue={groupName}
                                        onBlur={(e) => editGroupName(groupName, e.target.value)}
                                    />
                                    {groups[groupName].map(device => (
                                        <div key={device} draggable onDragStart={(event) => onDragStart(event, device)} className="device">
                                            {device}
                                            <SliderButton onClick={() => toggleDeviceState(groupName, device)}
                                                initialState={deviceStatuses[device]}
                                            />
                                        </div>
                                    ))}
                                    <button className="remove-group-button" onClick={() => removeGroup(groupName)}>Remove Group</button>
                                </div>
                            ))}
                        </div>
                    </div>
                } />
                <Route path="/add-device" element={
                    <AddDevicePage addDeviceToGroup={addDeviceToGroup} />
                } />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default App;