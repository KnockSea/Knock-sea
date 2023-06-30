import React from 'react'
import './scss/hostSearchMain.scss'
import HostPhotoCarousel from './hostPhotoCarousel'
import MpList from '../mypage/MpList'
import { getLoginUserInfo } from '../util/login-util';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_BASE_URL, PRODUCTS } from '../../config/host-config';


const HostSearchMain = () => {

    const params = useParams();
    
    const [productId, setProductId] = useState(params.productId);
    const [type, setType] = useState(params.type);
    const [token, setToken] = useState(getLoginUserInfo().token);
    const [userInfo, setUserInfo] = useState({});


    const hostFetch = async () => {

        try {
            const response = await fetch(`${API_BASE_URL}${PRODUCTS}/host-info?productId=${productId}&type=${type}`);
          
            if (response.status === 200) {
              const data = await response.json();
              setUserInfo(data);
            } else {
              // Handle other status codes
            }
          } catch (error) {
            // Handle fetch error
          }
        
    }

    const hostReview = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}${PRODUCTS}/host-review?shipId=${shipId}`);
          
            if (response.status === 200) {
              const data = await response.json();
              setUserInfo(data);
            } else {
              // Handle other status codes
            }
          } catch (error) {
            // Handle fetch error
          }
    }
    
    useEffect(()=>{
        hostFetch();
        console.log('유저 정보', userInfo);
    }, []);


    return (
        <section className='MyHostMainBox'>
            <div className='mainbox1'>
                  <div className='hostbox'>
                    <div className='mychoicebox'>
                        <h1>호스트 조회</h1>
                    </div>
                                      
                    <div className='user-search-box'>
                        <div className='user-photo-box'>
                            <img src={userInfo.imgUrl}/>
                                {/* <HostPhotoCarousel/>     */}
                        </div>

                        <div className='user-info-box'>
                            <div  className='user-info-page'>
                                <div className='nickName'>
                                    <p></p>
                                    <p>★★★★★</p>
                                </div>
                                <div className='profile'>
                                </div>
                            </div>
                            <div className='user-content-page'>
                                {/* <p>{userInfo.title}</p> */}
                                <p>소개소개소개</p>
                            </div>
                        </div>
                    </div>
                 </div>  
                <div className='rvbox'>
                        <h2>이 업체의 리뷰</h2>
                        <p>아직 작성된 리뷰가 없습니다</p>
                </div>

                <div className='rvbox2'>
                    <div>
                        <h2>이 업체의 글</h2>
                        <p>아직 작성된 글이 없습니다</p>
                    </div>
                </div>
            </div>
            
            <MpList />
        </section>
    )
}

export default HostSearchMain