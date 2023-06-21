import React from 'react'

const MpRvFormItem = () => {

  return (
    <div className='MpRvFromInfo'>
    <div className='mprvbox1'>
        <div>예약 ID</div>
        <div>인원</div>
        <div>게시판 제목</div>
        <div>예약자</div>
        <div>예약 날짜</div>
        <div>예약 일시</div>
    </div>
    <div className='mprvbox2'>
        <div className='mprvid'>LDG-20200101-12345</div>
        <div>2명</div>
        <div>제목입니다</div>
        <div>윤*식</div>
        <div>24.12.14</div>
        <div>14:00~17:00</div>
    </div>
</div>
  )


}

export default MpRvFormItem