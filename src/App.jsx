// // src/App.js
// import React from 'react';
// import TrackerApp from './components/TrackerApp';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <TrackerApp />
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


const App = () => {
  const [tracks, setTracks] = useState([]);
  const [formData, setFormData] = useState({
    date: '', steps: '', caloriesBurned: '', distanceCovered: '', weight: ''
  });

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    const res = await axios.get('http://localhost:5000/tracks');
    setTracks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/tracks', formData);
    fetchTracks();
  };

  const handleUpdate = async (id) => {
    const updatedData = { ...formData, steps: 10000 }; // example update
    await axios.put(`http://localhost:5000/tracks/${id}`, updatedData);
    fetchTracks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/tracks/${id}`);
    fetchTracks();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1 style={{backgroundColor:'green'}}>Health Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" onChange={e => setFormData({ ...formData, date: e.target.value })} />
        <input type="number" placeholder="Steps" onChange={e => setFormData({ ...formData, steps: e.target.value })} />
        <input type="number" placeholder="Calories" onChange={e => setFormData({ ...formData, caloriesBurned: e.target.value })} />
        <input type="number" placeholder="Distance" onChange={e => setFormData({ ...formData, distanceCovered: e.target.value })} />
        <input type="number" placeholder="Weight" onChange={e => setFormData({ ...formData, weight: e.target.value })} />
        <button type="submit">Add Track</button>
      </form>

      <ul>
        {tracks.map(track => (
          <li key={track._id}>
            {track.date} - {track.steps} steps
            <button onClick={() => handleUpdate(track._id)}>Update</button>
            <button onClick={() => handleDelete(track._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
