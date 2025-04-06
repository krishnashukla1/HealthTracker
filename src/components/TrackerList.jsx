import React, { useContext, useState } from 'react';
import { HealthContext } from '../Contexts/HealthContext';
import TrackerCard from './TrackerCard';

const TrackerList = () => {
  const { tracks, getTracksForDate } = useContext(HealthContext);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    console.log(selectedDate);
    setSelectedDate(selectedDate);
  };

  const filteredTracks = selectedDate ? getTracksForDate(selectedDate) : tracks;

  return (
    <div className="tracker-list">
      <h2>Records List</h2>
      <label htmlFor="datePicker">Select a date:</label>
      <input
        type="date"
        id="datePicker"
        value={selectedDate || ''}
        onChange={handleDateChange}
      />
      <div className="lists">
        {filteredTracks.length === 0 ? (
          <p>No tracks for the selected date.</p>
        ) : (
          filteredTracks.map((data) => (
            <TrackerCard key={data._id || data.date} data={data} />
          ))
        )}
      </div>
    </div>
  );
};

export default TrackerList;
