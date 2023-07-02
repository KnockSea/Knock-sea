import React from 'react'
import { Link } from 'react-router-dom'
import MpList from './MpList'
import MpRvFormItem from './MpRvFormItem'
import MpReFormItem from './MpReFormItem'
import {getLoginUserInfo, isLogin } from '../util/login-util';
import { useEffect } from 'react';
import { useState } from 'react';
import { API_BASE_URL, SHIP } from '../../config/host-config'
import MpReviewList from './MpReviewList';


const MpBtInfo = () => {


    const [shipinfo, setShipinfo] = useState({
        shipId: 0,
        category: null,
        shipDescription: '',
        shipLikeCount: 0,
        shipName: '',
        userName: '',
        shipImageLocation: []
      });


      const [userInfo, setUserInfo] = useState({
        token: '', // Set default value for name
        userEmail: '', // Set default value for email
        userName : '',
        userGrade : '',
        userId : '',
        userPhone : ''
      });
    
      //배 정보 가져오기
      const fetchShipInfo = async () => {
        const res = await fetch(`${API_BASE_URL}${SHIP}/getshipinfo`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' +localStorage.getItem('ACCESS_TOKEN')}
        });
    
        if (res.status === 200) {
            const json = await res.json(); // JSON 데이터 파싱
            setShipinfo(json);    
            // console.log(shipinfo);
        } else if(res.status===500){
            alert('등록된 선박이없습니다!');
        }else{
          alert('서버와의 통신이 원활하지않습니다!')
        }
      }
      
      //배정보 삭제하기
      const deleteShip = async (e) =>{
        
        e.preventDefault();

        const confirm = window.confirm('정말로 삭제하시겠습니까?');

        if(confirm){
        const res = await fetch(`${API_BASE_URL}${SHIP}/delete`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' +localStorage.getItem('ACCESS_TOKEN')}
        });
        if (res.status === 200) {
            const json = await res.json(); // JSON 데이터 파싱
            // console.log(shipinfo);
            alert('배정보 삭제완료');
            fetchShipInfo();
        } else if(res.status===500){
            alert('배정보 삭제에 실패했습니다');
        }else{
          alert('서버와의 통신이 원활하지않습니다!')
        }
      }else{
        return;
      }
    }   
    
    useEffect(() => {        
        const user = getLoginUserInfo();
        setUserInfo(user);
        fetchShipInfo();
      }, []);
    
  return (
   <section className='MyPageMainBox'>
            <div className='mainbox1'>
                    
                  <div className='mychoicebox'>
                      <div className='mpTitle'>
                          <h1>마이페이지</h1>
                      </div>
                      <div className='ownerTap'>
                          {userInfo.userGrade==='OWNER' &&(<Link to={'/mpbt'}><h1>⛵ 배</h1></Link>)}
                          {userInfo.userGrade==='OWNER' &&(<Link to={'/mpfs'}><h1>🚩 낚시터</h1></Link>)}
                          {/* {userInfo.userGrade==='OWNER' &&(<Link to={'/mpclass'}><h1>📚 클래스</h1></Link>)} */}
                      </div>
                  </div>
                  
                  <div className='userinfobox'>
                    <div className='userinfoWrap'>
                        <div className='profilebox'>
                          {shipinfo.shipImageLocation && shipinfo.shipImageLocation.length > 0 ? (<img className="my-profile" title="마이페이지" src={shipinfo.shipImageLocation[0]} />) : (<img className="my-profile" title="마이페이지" src={require('./../icons/defaultProfile.png')} />)}
                        </div>
                        <div className='namebox'>
                            <div className="nickName">
                              {shipinfo.shipName ? <span>{shipinfo.shipName}</span> : <span>등록된 배가  없습니다.</span>}
                            </div>
                            <div className="content">
                              {shipinfo.shipDescription ? <span>{shipinfo.shipDescription}</span> : <span>배를 등록해주세요.</span>}
                            </div>
                            <div>
                              {shipinfo.shipLikeCount ||<span>{setShipinfo.shipLikeCount}</span>}
                            </div> 
                        </div>
                    </div>
                  </div>
                  <div className='binfo-btbox'>
                        {shipinfo && shipinfo.shipId ? (
                          <>
                            <button className='binfo-isbtn' onClick={deleteShip}>배 정보 삭제하기</button>
                            {/* <button className='binfo-isbtn'>배 정보 수정하기</button> */}
                          </>
                            ) : (
                            <button className='binfo-isbtn'><Link to={'/myquery'}>글 등록하기</Link></button>
                          )}
                  </div>

              <div className='rvbox'>
              {userInfo.userGrade === 'OWNER' && (
                <div className='rvbox'>
                  <h2>리뷰 게시판</h2>
                  {shipinfo.shipId && <MpReviewList />}
                  {!shipinfo.shipId && <p>아직 작성된 리뷰가 없습니다.</p>}
                </div>
              )}
              {userInfo.userGrade === 'COMMON' && (
                <div className='rvbox'>
                  <h2>리뷰 게시판</h2>
                  {shipinfo.shipId && <MpReviewList />}
                  {!shipinfo.shipId && <p>아직 작성된 리뷰가 없습니다.</p>}
                </div>
                        )}

              </div>

   
          </div>
        
                <MpList />
        </section>
  )
}

export default MpBtInfo