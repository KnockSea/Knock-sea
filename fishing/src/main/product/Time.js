import React, { useState } from 'react';
import './scss/RegiTime.scss';

function TimeConverter({ onTimeChange }) {
  const selectBox1Values = Array.from({ length: 24 }, (_, i) => padZero(i) );
  const selectBox2Values = ['00', '30'];
  const selectBox3Values = Array.from({ length: 24 }, (_, i) => padZero(i));
  const selectBox4Values = ['00', '30'];

  const [selectBox1Index, setSelectBox1Index] = useState(0);
  const [selectBox2Index, setSelectBox2Index] = useState(0);
  const [selectBox3Index, setSelectBox3Index] = useState(0);
  const [selectBox4Index, setSelectBox4Index] = useState(0);
  const [convertedTime, setConvertedTime] = useState('');

  function convertToLocalTime() {
    const hour = selectBox1Values[selectBox1Index];
    const minute = selectBox2Values[selectBox2Index];
    const hour2 = selectBox3Values[selectBox3Index];
    const minute2 = selectBox4Values[selectBox4Index];

    const timeString = `${padZero(hour)}:${padZero(minute)} - ${padZero(hour2)}:${padZero(minute2)}`;
    setConvertedTime(timeString);
    onTimeChange(timeString);
  }

  function padZero(value) {
    return value.toString().padStart(2, '0');
  }

  function handleSelectBox1Change(event) {
    setSelectBox1Index(event.target.value);
  }

  function handleSelectBox2Change(event) {
    setSelectBox2Index(event.target.value);
  }

  function handleSelectBox3Change(event) {
    setSelectBox3Index(event.target.value);
  }

  function handleSelectBox4Change(event) {
    setSelectBox4Index(event.target.value);
  }

  
  return (
    <div className='RegiTime'>
      <select value={selectBox1Index} onChange={handleSelectBox1Change}>
        {selectBox1Values.map((value, index) => (
          <option key={index} value={index}>{value}</option>
        ))}
      </select>
      <select value={selectBox2Index} onChange={handleSelectBox2Change}>
        {selectBox2Values.map((value, index) => (
          <option key={index} value={index}>{value}</option>
        ))}
      </select>
      <select value={selectBox3Index} onChange={handleSelectBox3Change}>
        {selectBox3Values.map((value, index) => (
          <option key={index} value={index}>{value}</option>
        ))}
      </select>
      <select value={selectBox4Index} onChange={handleSelectBox4Change}>
        {selectBox4Values.map((value, index) => (
          <option key={index} value={index}>{value}</option>
        ))}
      </select>
      <button 
      onClick={convertToLocalTime} 
      className='convertedTimeBtn'>
      등록
      </button>
      {convertedTime && <span className='convertedTimeSpan'>{convertedTime}</span>}
    </div>
  );
}

export default TimeConverter;