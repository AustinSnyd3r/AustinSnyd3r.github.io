import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SliderButton from './SliderButton';
import AddDevicePage from '../Devices/AddDevicePage';
import Header from '../../AppHeader/Header';
import '../../App.css';

function App() {
    const initialGroups = [
        { id: 'misc', name: 'Misc', devices: ['Device 1', 'Device 2', 'Device 3'] },
        { id: 'bedroom', name: 'Bedroom', devices: ['Bed Lamp', 'Alarm Clock'] },
        { id: 'familyRoom', name: 'FamilyRoom', devices: ['TV', 'Stereo System'] },
        { id: 'diningRoom', name: 'DiningRoom', devices: ['Chandelier', 'Smart Speaker'] },
        { id: 'office', name: 'Office', devices: ['Desk Lamp', 'Computer', 'Printer'] },
        { id: 'outside', name: 'Outside', devices: ['Garden Lights', 'Pool Speaker'] }
    ];

    const [groups, setGroups] = useState(initialGroups);

    const onDragOver = (event) => {
        event.preventDefault();
    }

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
                        <Header />
                        <div className="group-controls">
                            <button className="add-group-button" onClick={addGroup}>Add Group</button>
                            <Link to="/add-device">
                                <button className="add-device-button">Add Device</button>
                            </Link>
                        </div>
                        <div className="device-groups">
                            {groups.map(group => (
                                <div key={group.id}
                                    className="device-group"
                                    onDragOver={onDragOver}
                                    onDrop={(event) => onDrop(group.id, event)}>
                                    <input
                                        type="text"
                                        defaultValue={group.name}
                                        onBlur={(e) => editGroupName(group.id, e.target.value)}
                                    />
                                    {group.devices.map(device => (
                                        <div key={device} draggable onDragStart={(event) => onDragStart(event, device)} className="device">
                                            {device}
                                            <SliderButton onClick={() => toggleDeviceState(group.name, device)}
                                                initialState={deviceStatuses[device]}
                                            />
                                        </div>
                                    ))}
                                    <button className="remove-group-button" onClick={() => removeGroup(group.id)}>Remove Group</button>
                                </div>
                            ))}
                        </div>
                    </div>
                } />
                <Route path="/add-device" element={
                    <AddDevicePage addDeviceToGroup={addDeviceToGroup} />
                } />
            </Routes>
        </Router>
    );
}

export default App;