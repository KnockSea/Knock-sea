import React from 'react'
import './scss/hostSearchMain.scss'
import HostPhotoCarousel from './hostPhotoCarousel'
import MpList from '../mypage/MpList'
import { getLoginUserInfo } from '../util/login-util';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_BASE_URL, PRODUCTS } from '../../config/host-config';

const HostSearchMain = () => {
    
    const [productId, setProductId] = useState();

    const hostFetch = async () => {
        const response = await fetch(`${API_BASE_URL}${PRODUCTS}/${productId}`, {
            
        });

        if (response.status === 200) {
            console.log(response.status);
            console.log(response.json());
        }
        
    }

    
    useEffect(()=>{
        // fetch(API_BASE_URL, { 
        //     method: 'GET',
        //     headers:  {'content-type': 'application/json'}
        //   })
        //     .then(res => {
        //       if (res.status === 200) return res.json();
        //      else {
        //         alert('서버가 불안정합니다');
        //       }
        //     })
        //     .then(json => {
        //       console.log(json); 
        //     });
    
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
                                <HostPhotoCarousel/>    
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
                                <p>제목입니둥</p>
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