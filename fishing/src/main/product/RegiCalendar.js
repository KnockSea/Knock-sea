import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import './scss/RegiCalendar.scss';
import { DateRangePicker } from 'react-date-range';
import { addDays } from "date-fns"

const RegiCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ])

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <div className='regi-calendar-content'>
          <div className="regi-selected-calendar">
              <DateRangePicker
              editableDateInputs={true}
              onChange={(item) => setState([item.selection])}
              // moveRangeOnFirstSelection={false}
              ranges={state}
              // direction="horizontal"
              locale={ko}
              className="datePicker"
              />


              {/* <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy년 MM월 dd일"
                    calendarClassName="regi-custom-calendar"
                    open
                    locale={ko}
                  /> */}
          </div>
          {selectedDate && (
            <div className="regi-selected-date">
              {/* <span>{selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</span> */}
            </div>
          )}
      </div>
        
          
    </div>
  );
};

export default RegiCalendar;
