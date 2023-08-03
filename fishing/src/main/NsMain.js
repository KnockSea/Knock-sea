import React, { useState, useEffect } from "react";
import "./scss/NsMain.scss";
import wt from "./img/wt.png";
import NsItem from "./NsItem";
import NsBanner from "./NsBanner";
import { Route, Routes } from "react-router-dom";
import RvTemplate from "./reservation/RvTemplate";
import NsFishingSpot from "./NsFishingSpot";
import NsClass from "./NsClass";
import RvBtDetail from "./reservation/RvBtDetail";
import MpMain from "./mypage/MpMain";
import Myinfo from "./mypage/Myinfo";
import Mypassword from "./mypage/Mypassword";
import MpUserDrop from "./mypage/MpUserDrop";
import MpDrop from "./mypage/MpDrop";
import MpInquire from "./mypage/MpInquire";
import MpRvlist from "./mypage/MpRvlist";
import MpReviewForm from "./mypage/MpReviewForm";

import ProductRegistration from "./product/ProductRegistration";
import RvFsDetail from "./fishingspot/RvFsDetail";
import RvFsTemplate from "./fishingspot/RvFsTemplate";
import WeeklyWeather from "./WeeklyWeather";
import SignUpForm from "./account/SignUpForm";
import Login from "./account/Login";
import ClassMain from "./class/ClassMain";
import ClassDetail from "./class/ClassDetail";
import OwnerCheckMain from "./ownercheck/OwnerCheckMain";
import OwnerCheckShip from "./ownercheck/OwnerCheckShip";
import OwnerCheckFishing from "./ownercheck/OwnerCheckFishing";
import MpQueryText from "./mypage/MpQueryText";

import MpBtInfo from "./mypage/MpBtInfo";
import MpFsInfo from "./mypage/MpFsInfo";
import MpClassInfo from "./mypage/MpClassInfo";
import { API_BASE_URL, PRODUCTS } from "../config/host-config";
import MpAdmin from "./mypage/MpAdmin";
import MpIqInput from "./mypage/MpIqInput";
import MpAdminFS from "./mypage/MpAdminFS";
import MpAdminCS from "./mypage/MpAdminCS";
import HostSearchMain from "./hostSearch/hostSearchMain";
import EduRegistration from "./product/EduRegistration";

import ScrollToTop from "./ScrollToTop";
import MpInquiryD from "./mypage/MpInquiryD";
import MpInquiryResult from "./mypage/MpInquiryResult";
import MpAdInquire from "./mypage/MpAdInquire";
import Like from "./like/Like";
import ReviewList from "./reviewList/ReviewList";
import weathericon from "./icons/weathericon.png";

const NsMain = ({ shipList, spotList, eduList }) => {
  return (
    <section>
        <ScrollToTop />
        <Routes>
           {/* home */}
            <Route path='/' element ={<MainContent shipList={shipList} spotList={spotList} eduList={eduList} />} />
  
            {/* <Route path='/detail' element={<RvBtDetail/>}> </Route> */}
            <Route path='bt/' element={<RvTemplate/>}> 
              <Route path='detail/:productId' element={<RvBtDetail/>}> </Route>
              <Route path='fsdetail/:productId' element={<RvFsDetail/>}> </Route>
            </Route>

            {/* 클래스 탭 */}
            <Route path='class/' element={<ClassMain/>}>
              <Route path='classdetail/:eduId' element={<ClassDetail/>}></Route>
            </Route>

            {/* 마이페이지 */}                        
            <Route path='my/' element={<MpMain/>}> 
              <Route path='info' element={<Myinfo/>}></Route>
              <Route path='password' element={<Mypassword/>}></Route>
              {/* 상품등록 */}
              <Route path='product' element={<ProductRegistration/>}></Route>
              <Route path='edu' element={<EduRegistration/>}></Route>
              
              <Route path='userDrop' element={<MpUserDrop/>}></Route>
              <Route path='drop' element={<MpDrop/>}></Route>
              {/* 문의하기 */}
              <Route path='iqinput' element={<MpIqInput/>}></Route>
              {/* 문의 현황 */}
              <Route path='inquire' element={<MpInquire/>}></Route>
              {/* 리뷰게시판 */}
              <Route path='reviewList' element={<ReviewList />}></Route>
              {/* 유저 문의 상세보기 */}
              <Route path="inquiryResult/:inquiryId" element={<MpInquiryResult />} />
              <Route path="rvlist" element={<MpRvlist />}></Route>
              <Route path="review" element={<MpReviewForm />}></Route>
            </Route>
            
            {/* 로그인 */}
            <Route path="/join" element={<SignUpForm />}></Route>

             {/* 회원가입 */}
            <Route path="/login" element={<Login />}></Route>
            
            {/* 업체 등록 */}
            <Route path="ownercheck/" element={<OwnerCheckMain />}>
            </Route>

            <Route path="fs/" element={<RvFsTemplate />}>
              <Route path="myquery" element={<MpQueryText />}></Route>
            </Route>

            {/* 업체 정보 */}
            <Route path="mpbt/" element={<MpBtInfo />}>
              <Route path="mpfs" element={<MpFsInfo />}></Route>
              <Route path="mpclass" element={<MpClassInfo />}></Route>
            </Route>

            {/* 관리자 */}
            <Route path='admin/' element={<MpAdmin/>}>
              <Route path='adminFs' element={<MpAdminFS/>}></Route>
              <Route path='adminCS' element={<MpAdminCS/>}></Route>
              {/* 관리자용 전체 문의 현황 */}
              <Route path='adInquire' element={<MpAdInquire/>}></Route>
              {/* 문의답변 */}
              <Route path="adminreply/:inquiryId" element={<MpInquiryD />}></Route>
            </Route>

            <Route path='/host/:productId/:type/:userId' element={<HostSearchMain/>}></Route>
            {/* <Route path='/hostuser/:userId/:type' element={<HostSearchMain/>}></Route> */}
            
        </Routes>                
    </section>
  );
};
const MainContent = ({ shipList, spotList, eduList }) => {
  return (
    <>
      {
        <>
          <NsBanner />
          <div className="mainbox">
            <div className="contentbox">
              <NsItem shipList={shipList} />
              <NsFishingSpot spotList={spotList} />
              <NsClass eduList={eduList} />
            </div>
            <div className="apibox">
              <div className="wtbox">
                <span>
                  <img src={weathericon} alt="weather" /> 이번 주 날씨{" "}
                </span>
                <WeeklyWeather />
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default NsMain;
