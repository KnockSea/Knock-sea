import React from 'react'
import './RvScss/RvBtDetail.scss'
import dt1 from '../img/dtRv.png'
import boat from '../img/boat.jpg'
const RvBtDetail = () => {
  return (
    
        <div className='allview'>
            <div className='imgbox'>
            <img src={boat} />
            <img src={boat} />
            </div>

            <div className='allContentbox'>


            <div className='left'>
                <div className='title'>
                    <h1>[영종도] 뉴동관호 1호~3호 대방어 낚시</h1>
                </div>
                <div className='minititle'>출조안내</div>

                <div className='text1'>
                    <p>회원님들의 즐거운 낚시와 안전을 위해 꼭 읽어주세요.</p>
                <mark className='t1'>
                    @ 주민등록증, 운전면허증, 여권 등 신분증 반드시 지참(미지참시 승선불가) <br/>
                    @ 신분증이 없는 어린이, 청소년의 경우, 가족관계증명서(실물), 주민등록등본(실물),사진 안됩니다!<br/>
                    </mark>
                    <mark>
                    @ 선상음주 금지 (300만원 이하의 과태료) <br/>
                    @ 구명조끼는 반드시 착용 ( 배에 비치되어 있습니다. 무료) (당사자에게 100만원의 과태료 부과) <br/>
                    </mark>
                </div>

             <div className='d1box'>
                <div className='d1'>유의사항</div>
             </div>
                {/* 예약박스 */}
             <div className='textboxs'>

                <div className='rvtext'>
                    <div className='tl1 mt'>
                      <h2>예약안내</h2>  
                        </div>
                    <div className='rv_t1'>
                    선박출조 예약시 승선료를 선입금 해 주셔야 예약이 완료됩니다. 미입금시 가예약 처리됩니다.<br/>
                    물때(조석)와 시기,출조기,승선인원에 따라 가격이 변동될 수 있습니다.<br/>
                    별도 문의바랍니다.
                    </div>
                </div>
                {/* 환불안내  */}
                <div className='paytext'>
                    <div className='tl2 mt'>
                    <h2>환불안내</h2>  
                        </div>
                    <div className='pay_t1'>
                        <mark>
                            환불시 무조건 본 금액의 10%는 제외됩니다. 꼭꼭꼭 신중히! 결정해주세요.<br/>
                            예약후 마음이 바뀌시거나 출조예정을 취소할 때는 꼭 전화로 말씀해주세요.
                        </mark>
                        <br/>
                        <br/>
                        <mark>
                            @출항 2주일전 취소는 90%환불 <br/>
                            @출항 4~13일 전 취소는 70%환불 <br/>
                            @출항 3~4일전 취소는 50%환불/ 날짜 변경불가 <br/>
                            @출항 3일전 날짜 환불불가 / 날짜 변경불과
                        </mark>
                        <br/>
                        <br/>
                        <mark>
                            @기상악화, 배 고장으로 인한 출조 취소는, 선비만 환불 해드립니다. <br/>
                            @신분증 미 소지자는 승선 하실수 없으며, 선비도 전액 환불이 되지 않습니다.<br/>
                            @선상에서 선장의 지시를 따르지 않을때 승선을 거부 할 권리가 있습니다.
                             그로 인 한 선비도 환불도 하지 않습니다.<br/>
                             @출항 취소나 배 고장으로 인한 조기 입항시, 교통비,
                              숙박비는 본인이 하신것 이기에 선사나 선장이 보상해주지 않습니다.
                        </mark>
                        <br/> <br/>
                        <p>출항 당일 안개나 취소로인해 해경이 출항동제시 
                            선비 전액 환불해드리며 환불선비 외 손님에게 추가 경비나
                            기타 별도 요구는 일체 지불되지 않습니다.<br/>
                            비는 선상낚시에 영향이 없습니다.(우비입고 출항합니다)<br/>
                            (출항은 가능하나 고객님께서 임의로 취소하실 경우 예약금 반환이 불가능하오니 참고하시기 바랍니다.)
                        </p>
                    </div>
                </div>
                {/* 유의사항 안내  */}
                <div className='dgtext'>
                    <div className='tl3 mt'>
                    <h2>유의사항 안내</h2>  
                        </div>
                    <div className='dg_t1'>
                        즐거운 바다낚시를 위하여 선상질서와 낚시예절은 꼭! 지켜주시고 <br/>
                        환경보호와 어족자원을 보호하기위해 납봉 사용은 불허하고 있습니다.<br/>
                        조사님 여러분의 동참과 협조를 부탁드립니다.<br/>
                        출항하실때에는 낚시대가 옆배와 부딪혀 파손될 우려가 있으니 철저한 주의와 관리를 당부 드립니다.<br/>
                        또한 선상에서 분실되는 물건이 간혹 발생하오니 철저한 주의와 관리를 부탁드립니다.<br/>
                        위와 같은 불미스러운 경우가 발생할 경우 개인 과실임을 알려드립니다.

                    </div>
                </div>
            </div>
        </div>



            <div className='right'>

            <div className='group1'>
                <div>
                    인원충원은 <b>커뮤니티</b>에서 충원 가능합니다.
                    </div>
                </div>
            <div className='clbox'>
                <img src={dt1}/>
            </div>
            <div className='profilebox'>
                <div className='proCircle'></div>
                <h2>뉴정환호</h2>
                <div className='pr1'>호스트 확인하기</div>
                <button>문의하기</button>
                </div>
            </div>

            </div>

        </div>
  
    )
}

export default RvBtDetail