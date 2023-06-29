import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import '../scss/Calendar.scss';

const ClassCalendar = ({ handleDateChange, startTime, EndTime }) => {
  
  const [selectedDate, setSelectedDate] = useState(null);
  const minDate = new Date(startTime); 
  const maxDate = new Date(EndTime); 
  maxDate.setDate(maxDate.getDate());
  
  const handleChange = (date) => {
    setSelectedDate(date);
    handleDateChange(date); 
  };

  const filterPastDates = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    return date >= today;
  };

  return (
    <div>
      <div className='calendar-content'>
      <h2>날짜 선택</h2>
      {selectedDate && (
        <div className="selected-date">
          <span>{selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      )}
      </div>
     
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="yyyy년 MM월 dd일"
        open 
        calendarClassName="custom-calendar"
        locale={ko}
        minDate={minDate} 
        maxDate={maxDate} 
        filterDate={filterPastDates}
      />
    </div>
  );
};

export default ClassCalendar;
