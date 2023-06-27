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
import MpReviewForm from './mypage/MpReviewForm'

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

import MpBtInfo from './mypage/MpBtInfo'
import MpFsInfo from './mypage/MpFsInfo'
import MpClassInfo from './mypage/MpClassInfo'
import { API_BASE_URL, PRODUCTS } from '../config/host-config';
import MpAdmin from './mypage/MpAdmin';
import MpIqInput from './mypage/MpIqInput';
import MpAdminFS from './mypage/MpAdminFS';
import MpAdminCS from './mypage/MpAdminCS';
import HostSearchMain from './hostSearch/hostSearchMain'
import EduRegistration from './product/EduRegistration';

import ScrollToTop from './ScrollToTop';
import MpInquiryD from './mypage/MpInquiryD';
import MpInquiryResult from './mypage/MpInquiryResult';
import MpAdInquire from './mypage/MpAdInquire';

const NsMain = () => {

  return (
    <section>
        <ScrollToTop />
        <Routes>
            <Route path='/bt' element={<RvTemplate/>} ></Route>
            <Route path='/' element ={<MainContent />} />
            {/* <Route path='/detail' element={<RvBtDetail/>}> </Route> */}
            <Route path='/detail/:productId' element={<RvBtDetail/>}> </Route>
            <Route path='/fsdetail/:productId' element={<RvFsDetail/>}> </Route>
            {/* 클래스 탭 */}
            <Route path='/class' element={<ClassMain/>}></Route>
            <Route path='/classdetail/:eduId' element={<ClassDetail/>}></Route>
            {/* 마이페이지 */}                        
            <Route path='/my' element={<MpMain/>}> </Route>
            <Route path='/myinfo' element={<Myinfo/>}></Route>
            <Route path='/mypassword' element={<Mypassword/>}></Route>
            {/* 상품등록 */}
            <Route path='/product' element={<ProductRegistration/>}></Route>
            <Route path='/edu' element={<EduRegistration/>}></Route>
            
            <Route path='/userDrop' element={<MpUserDrop/>}></Route>
            <Route path='/drop' element={<MpDrop/>}></Route>
            {/* 문의하기 */}
            <Route path='/iqinput' element={<MpIqInput/>}></Route>
            {/* 문의 현황 */}
            <Route path='/inquire' element={<MpInquire/>}></Route>
            관리자용 전체 문의 현황
            <Route path='/adInquire' element={<MpAdInquire/>}></Route>
            
            {/* 문의답변 */}
            <Route
                path="/adminreply/:inquiryId"
                element={<MpInquiryD />}
            ></Route>
            {/* 유저 문의 상세보기 */}
            <Route path="/inquiryResult/:inquiryId" element={<MpInquiryResult />} />
            <Route path="/rvlist" element={<MpRvlist />}></Route>
            <Route path="/review" element={<MpReviewForm />}></Route>

            {/* 로그인, 회원가입 */}
            <Route path="/join" element={<SignUpForm />}></Route>
            <Route path="/login" element={<Login />}></Route>
            {/* 업체 등록 */}
            <Route path="/ownercheck" element={<OwnerCheckMain />}></Route>
            <Route path="/ship" element={<OwnerCheckShip />}></Route>
            <Route path="/fishing" element={<OwnerCheckFishing />}></Route>

            <Route path="/fs" element={<RvFsTemplate />}></Route>
            <Route path="/myquery" element={<MpQueryText />}></Route>
            {/* 업체 정보 */}
            <Route path="/mpbt" element={<MpBtInfo />}></Route>
            <Route path="/mpfs" element={<MpFsInfo />}></Route>
            <Route path="/mpclass" element={<MpClassInfo />}></Route>
            {/* 관리자 */}
            <Route path='/admin' element={<MpAdmin/>}></Route>
            <Route path='/adminFs' element={<MpAdminFS/>}></Route>
            <Route path='/adminCS' element={<MpAdminCS/>}></Route>

            <Route path='/host' element={<HostSearchMain/>}></Route>
        </Routes>
            
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
            <NsItem 

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
    );
};

export default NsMain;
