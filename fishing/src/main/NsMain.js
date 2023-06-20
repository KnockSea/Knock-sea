import React from 'react'
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
import ProductRegistration from './product/ProductRegistration'
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


const NsMain = () => {



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
            <Route path='/product' element={<ProductRegistration/>}></Route>
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
            <Route path="/ship" element={<OwnerCheckShip/>} ></Route>
            <Route path="/fishing" element={<OwnerCheckFishing/>} ></Route> 
            <Route path='/myquery' element={<MpQueryText/>}></Route>

        </Routes>
        {/* <div className='banner'><img src={banner} /></div> */}
        {/* <NsBanner />

       <div className='mainbox'>

        <div className='contentbox'>
            <NsItem />
            <NsItem />
            <NsItem /> */}
            {/* <div className='ship'>
                <div className='title'>
                    <p className='t1'>오늘의 배낚시 > </p>
                    <p className='t2'>더보기</p>
                </div>
                <div className='shipboxs'>
                    <div><img src={ex} /></div>
                    <div><img src={ex} /></div>
                    <div><img src={ex} /></div>
                </div>
            </div> */}

           

        {/* </div>
        <div className='apibox'>
            <div className='exbox'>이번주 날씨 > </div>
        </div>
       </div> */}
    </section>
  )
}
const MainContent = ({ isRouteActive }) => {
    return (
        <>
           {!isRouteActive && (
            <>
                   <NsBanner />

            <div className='mainbox'>
            <div className='contentbox'>
            <NsItem />
            <NsFishingSpot />
            <NsClass />


            </div>
        <div className='apibox'>
            {/* <div className='exbox'>이번주 날씨 > </div> */}
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