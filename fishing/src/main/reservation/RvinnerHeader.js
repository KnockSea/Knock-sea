import React , {useState } from 'react'
import './RvScss/RvinnerHeader.scss'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import Multiselect from 'multiselect-react-dropdown';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
const RvinnerHeader = () => {
 
    const [startDate, setStartDate] = useState(null);

  const [selectedCity, setSelectedCity] = useState(null);

  const cities = [

      { name: '전체', code: 'A11' },
      { name: '강원', code: 'A1' },
      { name: '경기/인천', code: 'A2' },
      { name: '광주/전라', code: 'A3' },
      { name: '대구/울산/경북', code: 'A4' },
      { name: '대전/충청', code: 'A5' },
      { name: '부산/경남', code: 'A6' },
      { name: '서울', code: 'A7' },
      { name: '제주', code: 'A8' }
  ];
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
        <div className="card flex justify-content-center">
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                placeholder="" className="w-full md:w-14rem" />
        </div>
   
        
    </div>



    <div>세부검색
    <div>
        <input />
        </div>
    </div>
    </div>
  
    <button className='search'>검 색</button>
</div>
  )
}

export default RvinnerHeader