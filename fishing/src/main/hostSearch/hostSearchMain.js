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
    
    const [ownerId, setOwnerId] = useState(params.userId);
    const [productId, setProductId] = useState(params.productId);
    const [type, setType] = useState(params.type);
    const [token, setToken] = useState(getLoginUserInfo().token);
    const [ownerInfo, setOwnerInfo] = useState({}); // 상품에서~ 보는 사장정보
    const [ownerReview, setOwnerReview] = useState([]); //상품에서~ 보는 리뷰

    // 상품에서 호스트 넘어올떄 ~
    const hostFetch = async () => {

        try {
            const response = await fetch(`${API_BASE_URL}${PRODUCTS}/host-info?productId=${productId}&type=${type}`);
          
            if (response.status === 200) {
              const data = await response.json();
              setOwnerInfo(data);
            } else {
              // Handle other status codes
            }
          } catch (error) {
            // Handle fetch error
          }
        
    }
    // 상품에서 호스트 넘어올때 리뷰
    const hostReview = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}${PRODUCTS}/host-review?id=${productId}&type=${type}`);
          
            if (response.status === 200) {
              const data = await response.json();
              setOwnerReview(data);
            } else {
              console.log('왜?', response.status);
            }
          } catch (error) {
            // Handle fetch error
          }
    }

    const hostProduct = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}${PRODUCTS}/host-review?userId=${ownerId}&type=${type}`);
          
            if (response.status === 200) {
              const data = await response.json();
              setOwnerReview(data);
            } else {
              console.log('왜?', response.status);
            }
          } catch (error) {
            // Handle fetch error
          }
    }
    
    useEffect(()=>{
        hostFetch();
        hostReview();
        
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
                            <img src={ownerInfo.imgUrl}/>
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
                                {/* <p>{ownerInfo.title}</p> */}
                                <p>소개소개소개</p>
                            </div>
                        </div>
                    </div>
                 </div>  
                <div className='rvbox'>
                        <h2>이 업체의 리뷰</h2>
                        <p>아직 작성된 리뷰가 없습니다</p>
                        {ownerReview.map(rev => {
                            <div>{rev.reviewContent} </div>
                        })}
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