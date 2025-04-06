import React from 'react';

const TrackerCard = ({ data }) => {
  const {
    date,
    steps,
    caloriesBurned,
    distanceCovered,
    weight,
  } = data;

  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div className="tracker-card">
      <h3>
        <span className="span">Date:</span> {formattedDate}
      </h3>
      <p><span className="span">Steps:</span> {steps}</p>
      <p><span className="span">Calories Burned:</span> {caloriesBurned}</p>
      <p><span className="span">Distance Covered:</span> {distanceCovered}</p>
      <p><span className="span">Weight:</span> {weight} Kg</p>
    </div>
  );
};

export default TrackerCard;
