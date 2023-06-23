import { DateRange } from 'react-date-range';
import { Component } from 'react';
import { addDays, format } from "date-fns";
import ko from 'date-fns/locale/ko';

class CalendarComponent extends Component {
  constructor(props) {
    super(props);
    const selectedDate = new Date(); // 기본적으로 선택된 날짜
    this.state = {
      startDate: selectedDate,
      endDate: addDays(selectedDate, 7), // 선택한 날짜부터 7일 후
      key: 'selection'
    };
  }

  onRangeChange = (ranges) => {
    const { startDate } = ranges.selection;
    const endDate = addDays(startDate, 7);

    const startDateString = format(startDate, "yyyy-MM-dd'T'HH:mm:ss");
    const endDateString = format(endDate, "yyyy-MM-dd'T'HH:mm:ss");

    this.setState({
      startDate,
      endDate,
      key: ranges.selection.key,
    });
  
    this.props.onRangeChange({ ...ranges, selection: { ...ranges.selection, startDate: startDateString, endDate: endDateString } });
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
        />
      </div>
    )
  }
}

export default CalendarComponent;
