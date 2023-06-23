import { DateRange } from 'react-date-range';
import { Component } from 'react';
import { addDays } from "date-fns";
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
    console.log("날짜:", ranges);
    this.setState({
      startDate: ranges['selection'].startDate,
      endDate: addDays(ranges['selection'].startDate, 7), // 선택한 날짜부터 7일 후
      key: ranges['selection'].key,
    });

    this.props.onRangeChange(ranges);
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
