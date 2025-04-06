// src/components/TrackerApp.js
import React from 'react';
import Navbar from './Navbar';
import TrackerList from './TrackerList';
import { HealthProvider } from '../Contexts/HealthContext';

const TrackerApp = () => {
  return (
    <HealthProvider>
      <div className="main-container">
        <Navbar />
        <TrackerList />
      </div>
    </HealthProvider>
  );
};

export default TrackerApp;
