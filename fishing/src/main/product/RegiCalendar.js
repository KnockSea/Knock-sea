import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import '../scss/RegiCalendar.scss';

const RegiCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <div className='regi-calendar-content'>
      {selectedDate && (
        <div className="regi-selected-date">
          {/* <span>{selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</span> */}
        </div>
      )}
      </div>
     
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy년 MM월 dd일"
        calendarClassName="regi-custom-calendar"
        locale={ko}
      />
    </div>
  );
};

export default RegiCalendar;
