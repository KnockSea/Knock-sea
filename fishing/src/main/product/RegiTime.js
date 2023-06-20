import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const MyTimePicker = () => {
  const [startHour, setStartHour] = useState('');
  const [startMinute, setStartMinute] = useState('');
  const [endHour, setEndHour] = useState('');
  const [endMinute, setEndMinute] = useState('');
  const selectStyle = {
    width: '70px',
    height: '50px',
    marginRight: '5px',
  };

  const handleStartHourChange = (event) => {
    setStartHour(event.target.value);
  };

  const handleStartMinuteChange = (event) => {
    setStartMinute(event.target.value);
  };

  const handleEndHourChange = (event) => {
    const selectedHour = event.target.value;
    if (selectedHour < startHour) {
      alert('종료 시간을 확인해주세요.');
    } else {
      setEndHour(selectedHour);
    }
  };

  const handleEndMinuteChange = (event) => {
    const selectedMinute = event.target.value;
    // 만약 종료 시간이 시작 시간보다 빠르다면 알림을 보여줌
    if (startHour === endHour && selectedMinute <= startMinute) {
      alert('종료 시간을 확인해주세요.');
    } else {
      setEndMinute(selectedMinute);
    }
  };

  const formatTime = (hour, minute) => {
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    return `${formattedHour} 시 ${formattedMinute} 분`;
  };

  return (
    <div className='regi-time-form' style={{display:'flex', justifyContent:'spaceBetween'}}>
      <div>
      <FormControl>
        <Select
          labelId="start-hour-label"
          id="start-hour-select"
          value={startHour}
          onChange={handleStartHourChange}
          style={selectStyle}
        >시
          {Array.from(Array(24).keys()).map((hour) => (
            <MenuItem key={hour} value={hour}>
              {hour.toString().padStart(2, '0')}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <Select
          labelId="start-minute-label"
          id="start-minute-select"
          value={startMinute}
          onChange={handleStartMinuteChange}
          style={selectStyle}
        >
          <MenuItem value="00">00</MenuItem>
          <MenuItem value="30">30</MenuItem>
        </Select>
      </FormControl>
      <span style={selectStyle}>~</span>
      <FormControl>
        <Select
          labelId="end-hour-label"
          id="end-hour-select"
          value={endHour}
          onChange={handleEndHourChange}
          style={selectStyle}
        >
          {Array.from(Array(24).keys()).map((hour) => (
            <MenuItem key={hour} value={hour}>
              {hour.toString().padStart(2, '0')}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <Select
          labelId="end-minute-label"
          id="end-minute-select"
          value={endMinute}
          onChange={handleEndMinuteChange}
          style={selectStyle}
        >
          <MenuItem value="00">00</MenuItem>
          <MenuItem value="30">30</MenuItem>
        </Select>
      </FormControl>
      </div>
    
    </div>
  );
};

export default MyTimePicker;
