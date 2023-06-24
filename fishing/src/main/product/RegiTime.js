import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';

const RegiTime = ({onChange,testProps}) => {

  const [startHour, setStartHour] = useState('');
  const [startMinute, setStartMinute] = useState('');
  const [endHour, setEndHour] = useState('');
  const [endMinute, setEndMinute] = useState('');
  const [testVal,setTestVal] = useState(0);
  const selectStyle = {
    width: '70px',
    height: '30px',
    marginRight: '5px',
    fontSize: '13px'
  };

useEffect(()=>{
  testProps(5)
},[startHour,startMinute,endHour,endMinute])

  const handleStartHourChange = (event) => {
    setStartHour(event.target.value);
    onChange={handleTimeChange} // 값 변경 시 onChange 콜백 호출
  };


  const handleStartMinuteChange = (event) => {
    setStartMinute(event.target.value);
    onChange={handleTimeChange}
  };

  const handleEndHourChange = (event) => {
    const selectedHour = event.target.value;
    if (selectedHour < startHour) {
      alert('종료 시간을 확인해주세요.');
    } else {
      setEndHour(selectedHour);
      onChange={handleTimeChange}
    }
  };

  const handleEndMinuteChange = (event) => {
    const selectedMinute = event.target.value;
    // 만약 종료 시간이 시작 시간보다 빠르다면 알림을 보여줌
    if (startHour === endHour && selectedMinute <= startMinute) {
      alert('종료 시간을 확인해주세요.');
    } else {
      setEndMinute(selectedMinute);
      onChange={handleTimeChange}
    }
  };

  const handleTimeChange = (startHour, startMinute, endHour, endMinute) => {
    setStartHour(startHour);
    setStartMinute(startMinute);
    setEndHour(endHour);
    setEndMinute(endMinute);
  };
  
  console.log(startHour, startMinute, endHour, endMinute);
  // formatTime 함수를 MyTimePicker 컴포넌트 외부로 이동
  const formatTime = (startHour, startMinute, endHour, endMinute) => {
    const formattedStartHour = startHour.toString().padStart(2, '0');
    const formattedStartMinute = startMinute.toString().padStart(2, '0');
    const formattedEndHour = endHour.toString().padStart(2, '0');
    const formattedEndMinute = endMinute.toString().padStart(2, '0');
   
    return `${formattedStartHour} 시 ${formattedStartMinute} 분 ~ ${formattedEndHour} 시 ${formattedEndMinute} 분`;
  };

const testHandle = () =>{
  onChange((startHour,startMinute,endHour,endMinute))
}
  return (
    <div className='regi-time-form' style={{display:'flex', justifyContent:'spaceBetween'}}>
      <div>
      <FormControl>
        <Select
          labelId="start-hour-label"
          id="start-hour-select"
          value={startHour}
          
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
          
          value={endMinute}
          onChange={handleTimeChange}
          style={selectStyle}
        >
          <MenuItem value="00">00</MenuItem>
          <MenuItem value="30">30</MenuItem>
        </Select>
      </FormControl>

      <span style={{fontSize:"12px"}}>{formatTime(startHour, startMinute, endHour, endMinute)}</span>
      <button onClick={testHandle}>qqwqeqw</button>
      </div>
     </div>
  );
};

export default RegiTime;
