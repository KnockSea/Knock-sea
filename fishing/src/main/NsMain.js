import React, { useState, useEffect } from 'react';
import './scss/NsMain.scss'
import wt from './img/wt.png'

import NsItem from './NsItem'
import NsBanner from './NsBanner'
import { Route, Routes } from 'react-router-dom'
import RvTemplate from './reservation/RvTemplate'
import NsFishingSpot from './NsFishingSpot'
import NsClass from './NsClass'
import RvBtDetail from './reservation/RvBtDetail'
import MpMain from './mypage/MpMain'
import Myinfo from './mypage/Myinfo'
import Mypassword from './mypage/Mypassword'
import MpUserDrop from './mypage/MpUserDrop'
import MpDrop from './mypage/MpDrop'
import MpInquire from './mypage/MpInquire'
import MpRvlist from './mypage/MpRvlist'
import RvFsDetail from './fishingspot/RvFsDetail'
import RvFsTemplate from './fishingspot/RvFsTemplate'
import WeeklyWeather from './WeeklyWeather'
import SignUpForm from './account/SignUpForm'
import Login from './account/Login'
import ClassMain from './class/ClassMain'
import ClassDetail from './class/ClassDetail'
import OwnerCheckMain from './ownercheck/OwnerCheckMain'
import OwnerCheckShip from './ownercheck/OwnerCheckShip'
import OwnerCheckFishing from './ownercheck/OwnerCheckFishing'
import MpQueryText from './mypage/MpQueryText'
import MpBtInfo from './mypage/MpBtInfo'
import MpFsInfo from './mypage/MpFsInfo'
import MpClassInfo from './mypage/MpClassInfo'
import { API_BASE_URL, SHIP } from '../config/host-config';






const NsMain = () => {

    const [shipInfo, setShipInfo] = useState(null);

    useEffect(() => {
      // 배 정보를 가져오는 함수
      const fetchShipInfo = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}${SHIP}/getshipinfo`);
          const data = await response.json();
          setShipInfo(data);
        } catch (error) {
          console.error('Error fetching ship info:', error);
        }
      };
  
      fetchShipInfo();
    }, []);


  return (
    <section>
        <Routes>
            <Route path='/bt' element={<RvTemplate/>} ></Route>
            <Route path='/' element ={<MainContent />} />
            <Route path='/detail' element={<RvBtDetail/>}> </Route>
            <Route path='/fsdetail' element={<RvFsDetail/>}> </Route>
            <Route path='/my' element={<MpMain/>}> </Route>
            <Route path='/myinfo' element={<Myinfo/>}></Route>
            <Route path='/mypassword' element={<Mypassword/>}></Route>
            <Route path='/userDrop' element={<MpUserDrop/>}></Route>
            <Route path='/drop' element={<MpDrop/>}></Route>
            <Route path='/inquire' element={<MpInquire/>}></Route>
            <Route path='/rvlist' element={<MpRvlist/>}></Route>
            <Route path='/fs' element={<RvFsTemplate/>}></Route>
            <Route path='/join' element={<SignUpForm/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/class' element={<ClassMain/>}></Route>
            <Route path='/classdetail' element={<ClassDetail/>}></Route>
            <Route path='/ownercheck' element={<OwnerCheckMain/>}></Route>
            {/* <Route path="/ship" element={<OwnerCheckShip/>} ></Route>
            <Route path="/fishing" element={<OwnerCheckFishing/>} ></Route>   */}
            <Route path='/myquery' element={<MpQueryText/>}></Route>
            {/* 업체 정보 */}
            <Route path='/mpbt' element={<MpBtInfo/>}></Route>
            <Route path='/mpfs' element={<MpFsInfo/>}></Route>
            <Route path='/mpclass' element={<MpClassInfo/>}></Route>
        </Routes>
            
                {/* MainContent 컴포넌트에 shipInfo prop 전달 */}
      <MainContent shipInfo={shipInfo} />
    </section>
  )
}
const MainContent = ({ isRouteActive , shipInfo}) => {
    return (
        <>
           {!isRouteActive && (
            <>
                   <NsBanner />

            <div className='mainbox'>
            <div className='contentbox'>
            <NsItem 
            shipInfo={shipInfo}
            />
            <NsFishingSpot />
            <NsClass />


            </div>
        <div className='apibox'>
            <div className='wtbox'>
                <WeeklyWeather/>
            </div>
        </div>
       </div>
            </>

           )}    
        </>
    )
}

export default NsMain