import React, { useState, useRef } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';

const RegiTime = ({formatTime}) => {

  const myRef1 = useRef();
  const myRef2 = useRef();
  const myRef3 = useRef();
  const myRef4 = useRef();

  const [startHour, setStartHour] = useState('');
  const [startMinute, setStartMinute] = useState('');
  const [endHour, setEndHour] = useState('');
  const [endMinute, setEndMinute] = useState('');

  const selectStyle = {
    width: '70px',
    height: '30px',
    marginRight: '5px',
    fontSize: '13px'
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

  const handleTimeChange = e => {
    // handleStartHourChange();
    // handleStartMinuteChange();
    // handleEndHourChange();
    // handleEndMinuteChange();
    // formatTime(startHour, startMinute, endHour, endMinute); 
    formatTime(myRef1.current.value, myRef2.current.value, myRef3.current.value, myRef4.current.value); 
  };

  // formatTime 함수를 MyTimePicker 컴포넌트 외부로 이동
  // {
  //   const formattedStartHour = startHour.toString().padStart(2, '0');
  //   const formattedStartMinute = startMinute.toString().padStart(2, '0');
  //   const formattedEndHour = endHour.toString().padStart(2, '0');
  //   const formattedEndMinute = endMinute.toString().padStart(2, '0');
  //   return `${formattedStartHour} 시 ${formattedStartMinute} 분 ~ ${formattedEndHour} 시 ${formattedEndMinute} 분`;
  // };


  return (
    <div className='regi-time-form' style={{display:'flex', justifyContent:'spaceBetween'}}>
      <div>
      <FormControl>
        <Select
          labelId="start-hour-label"
          id="start-hour-select"
          value={startHour}
          ref={myRef1}
          onChange={handleTimeChange}
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
          labelId="start-minute-label"
          id="start-minute-select"
          value={startMinute}
          ref={myRef2}
          onChange={handleTimeChange}
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
          ref={myRef3}
          onChange={handleTimeChange}
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
          ref={myRef4}
          value={endMinute}
          onChange={handleTimeChange}
          style={selectStyle}
        >
          <MenuItem value="00">00</MenuItem>
          <MenuItem value="30">30</MenuItem>
        </Select>
      </FormControl>
      {/* <span style={{fontSize:"12px"}}>{formatTime(startHour, startMinute, endHour, endMinute)}</span> */}
      </div>
     </div>
  );
};

export default RegiTime;
