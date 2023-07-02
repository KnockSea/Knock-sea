import { DateRange } from 'react-date-range';
import { Component } from 'react';
import { addDays, format, isBefore, isAfter, isSameDay } from "date-fns";
import ko from 'date-fns/locale/ko';

class CalendarComponent extends Component {
  constructor(props) {
    super(props);
    const selectedDate = new Date(); 
    this.state = {
      startDate: selectedDate,
      endDate: addDays(selectedDate, 6), 
      key: 'selection',
      disabledDates: this.getDisabledDates(selectedDate)
    };
  }

  onRangeChange = (ranges) => {
    const { startDate } = ranges.selection;
    const endDate = addDays(startDate, 6);


    const startDateString = format(startDate, "yyyy-MM-dd");
    const endDateString = format(endDate, "yyyy-MM-dd");

    this.setState({
      startDate,
      endDate,
      disabledDates: this.getDisabledDates(startDate)
    });
  
    this.props.onRangeChange({ ...ranges, selection: { ...ranges.selection, startDate: startDateString, endDate: endDateString } });
  }

  getDisabledDates = (selectedDate) => {
    const today = new Date(); 
    today.setHours(0, 0, 0, 0); 
    const disabledDates = [];

    while (isBefore(selectedDate, today)) {
      disabledDates.push(selectedDate);
      selectedDate = addDays(selectedDate, 1);
    }

    return disabledDates;
  }

  render() {
    return (
      <div>
        <DateRange
          editableDateInputs={true}
          onChange={this.onRangeChange}
          moveRangeOnFirstSelection={false}
          ranges={[this.state]}
          locale={ko}
         /// minDate={new Date()} 
          disabledDates={this.state.disabledDates} 
          dayProps={(date) => ({
          className: isSameDay(date, new Date()) ? "today disabled" : "disabled"
          })}
        />
      </div>
    )
  }
}

export default CalendarComponent;