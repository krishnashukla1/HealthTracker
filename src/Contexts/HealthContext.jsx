// src/context/HealthContext.js
import React, {
    createContext,
    useState,
    useEffect
  } from 'react';
  import axios from 'axios';
  
  const HealthContext = createContext();
  
  const HealthProvider = ({ children }) => {
    const [tracks, setTracks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null); // ✅ fixed typo: selectedDatqe ➝ selectedDate
  
    useEffect(() => {
      const fetchTracks = async () => {
        try {
          const response = await axios.get('http://localhost:5000/tracks');
  
          // Sort tracks by date in descending order (most recent first)
          const sortedTracks = response.data
            .slice()
            .sort((a, b) => new Date(b.date) - new Date(a.date));
  
          setTracks(sortedTracks);
        } catch (error) {
          console.error('Error fetching health tracks:', error.message);
        }
      };
  
      fetchTracks();
    }, []);
  
    const updateTrack = async (date, newData) => {
      try {
        const response = await axios.put(
          `http://localhost:5000/tracks/${date}`,
          newData
        );
  
        setTracks((prevTracks) => {
          const isoDate = new Date(date).toISOString();
          const index = prevTracks.findIndex(
            (track) => new Date(track.date).toISOString() === isoDate
          );
  
          if (index !== -1) {
            const updatedTracks = [...prevTracks];
            updatedTracks[index] = response.data;
            return updatedTracks;
          }
  
          return prevTracks;
        });
      } catch (error) {
        console.error('Error updating health track:', error.message);
      }
    };
  
    const getTracksForDate = (date) => {
      const selectedDate = new Date(date);
  
      return tracks.filter((track) => {
        const trackDate = new Date(track.date);
        return (
          trackDate.toISOString().split('T')[0] ===
          selectedDate.toISOString().split('T')[0]
        );
      });
    };
  
    const value = {
      tracks,
      setSelectedDate,
      updateTrack,
      getTracksForDate,
    };
  
    return (
      <HealthContext.Provider value={value}>
        {children}
      </HealthContext.Provider>
    );
  };
  
  export { HealthContext, HealthProvider };
  