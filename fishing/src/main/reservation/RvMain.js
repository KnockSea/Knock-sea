import React from 'react'
import './RvScss/RvMain.scss'


function RvMain() {
  return (

    <div>RvMain
        <div className='rvMain'>
            <div className='rvContent'>

                <div className='rvChoice'>
                    <div className='rvbox'>

                    <div>날짜선택
                        <div>
                        <select>
                            <option>06-08</option>
                            <option>06-09</option>
                            <option>06-10</option>
                        </select>
                        </div>
                    </div>

                    <div>지역선택
                    <div>
                        <select>
                            <option>06-08</option>
                            <option>06-09</option>
                            <option>06-10</option>
                        </select>
                        </div>
                    </div>
                    <div>세부검색
                    <div>
                        <select>
                            <option>06-08</option>
                            <option>06-09</option>
                            <option>06-10</option>
                        </select>
                        </div>
                    </div>
                    </div>
                  
                    <button>선택</button>
                </div>

            



            </div>



            <div className='rvApibox'></div>
        </div>

    </div>

  )
}

export default RvMain