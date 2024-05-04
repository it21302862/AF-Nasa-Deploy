import React, { useState } from 'react';
import APODImage from '../components/NasaAPI/Astronomy';
import '../styles/nasahome.css';

const NasaHomePage = () => {
  const apiKey = 'yJZPuN2nvNQGZCf4SD7HMM6XhUdl1ZwNXBTrXD2P';
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [count, setCount] = useState('');
  const [thumbs, setThumbs] = useState(false);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleCountChange = (event) => {
    setCount(event.target.value);
  };

  const handleThumbsChange = (event) => {
    setThumbs(event.target.checked);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="field">
          <label>Select Date:</label>
          <input type="date" value={selectedDate} onChange={handleDateChange} />
        </div>
        <div className="field">
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={handleStartDateChange} />
        </div>
        <div className="field">
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={handleEndDateChange} />
        </div>
        <div className="field">
          <label>Count:</label>
          <input type="number" value={count} onChange={handleCountChange} />
        </div>
      </div>
      <APODImage apiKey={apiKey} date={selectedDate} startDate={startDate} endDate={endDate} count={count} thumbs={thumbs} />
    </div>
  );
  
};

export default NasaHomePage;