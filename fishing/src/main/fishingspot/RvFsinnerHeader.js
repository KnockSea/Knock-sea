import React , {useState } from 'react'
import './RvScss/RvFsinnerHeader.scss'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import Multiselect from 'multiselect-react-dropdown';


const RvinnerHeader = () => {
 
    const [startDate, setStartDate] = useState(null);

//    this.state = {
//     options: [{name: 'Option 1️⃣', id: 1},{name: 'Option 2️⃣', id: 2}]
// };

    return (

    <div className='rvChoice'>
    <div className='rvbox'>

    <div>날짜선택
        <div>
        <DatePicker
        dateFormat={"yyyy/MM/dd"}
        locale={ko}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      minDate={new Date()}
      maxDate={addMonths(new Date(), 1)}
      showDisabledMonthNavigation
     />
        </div>
    </div>

    <div>지역선택
    <div>
    <Multiselect
    placeholder="선택하세요"
  displayValue="key"
  onKeyPressFn={function noRefCheck(){}}
  onRemove={function noRefCheck(){}}
  onSearch={function noRefCheck(){}}
  onSelect={function noRefCheck(){}}
  options={[
    {
      cat: 'Group 1',
      key: '강원'
    },
    {
      cat: 'Group 1',
      key: '경기/인천'
    },
    {
      cat: 'Group 1',
      key: '광주/전라'
    },
    {
      cat: 'Group 2',
      key: '대구/울산/경북'
    },
    {
      cat: 'Group 2',
      key: '대전/충청'
    },
    {
      cat: 'Group 2',
      key: '부산/경남'
    },
    {
      cat: 'Group 2',
      key: '서울'
    },
    {
      cat: 'Group 2',
      key: '제주'
    }
  ]}
  showCheckbox
/>
        </div>
    </div>
    <div>세부검색
    <div>
        <input />
        {/* <select>
            <option>06-08</option>
            <option>06-09</option>
            <option>06-10</option>
        </select> */}
        </div>
    </div>
    </div>
  
    <button className='search'>검 색</button>
</div>
  )
}

export default RvinnerHeader