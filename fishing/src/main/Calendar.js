import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import './scss/Calendar.scss';

const Calendar = ({  handleDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const minDate = new Date(); // 최소 날짜
  const maxDate = new Date(); // 최대 날짜
  maxDate.setDate(maxDate.getDate() + 7);
  
  const handleChange = (date) => {
    setSelectedDate(date);
    handleDateChange(date); 
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
        minDate={minDate} // 최소 날짜 설정
        maxDate={maxDate} // 최대 날짜 설정
      />
      
    </div>
  );
};

export default Calendar;
