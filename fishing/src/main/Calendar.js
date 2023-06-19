import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import './scss/Calendar.scss';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
        onChange={handleDateChange}
        dateFormat="yyyy년 MM월 dd일"
        open 
        calendarClassName="custom-calendar"
        locale={ko}
      />
      
    </div>
  );
};

export default Calendar;