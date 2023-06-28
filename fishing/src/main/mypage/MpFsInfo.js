import React from "react";
import { Link } from "react-router-dom";
import MpList from "./MpList";
import { getLoginUserInfo } from "../util/login-util";
import { useState } from "react";
import { useEffect } from "react";
import { API_BASE_URL,FISHINGSPOT } from "../../config/host-config";
const MpFsInfo = () => {


  const [spotInfo, setSpotInfo] = useState({
    spotId: 0,
    category: '',
    spotDescription: '',
    spotLikeCount: 0,
    spotName: '',
    spotImageLocation: []
  });

  console.log('spotInfo',spotInfo);

  const [userInfo, setUserInfo] = useState({
    token: '', // Set default value for name
    userEmail: '', // Set default value for email
    userName : '',
    userGrade : '',
    userId : '',
    userPhone : ''
  });


const fetchSpotInfo = async () => {
    const res = await fetch(`${API_BASE_URL}${FISHINGSPOT}/getspotinfo`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' +localStorage.getItem('ACCESS_TOKEN')}
    });

    if (res.status === 200) {
        const json = await res.json(); // JSON 데이터 파싱
        console.log(json);
        setSpotInfo(json);
        console.log(spotInfo.spotImageLocation[0]);

        /*
        // 서버에서 직렬화된 이미지가 응답된다.
        const profileBlob = await res.blob();
        // 해당 이미지를 imgUrl로 변경
        const imgUrl = window.URL.createObjectURL(profileBlob);
        setProfileUrl(imgUrl);
        */
    } else if(res.status===500){
        alert('등록된 낚시터가없습니다!');
    }else{
      alert('서버와의 통신이 원활하지않습니다!')
    }
  }

  //낚시터 정보 삭제하기
  const deletespot = async (e) =>{
        
    e.preventDefault();

    const confirm = window.confirm('정말로 삭제하시겠습니까?');

    if(confirm){
    const res = await fetch(`${API_BASE_URL}${FISHINGSPOT}/delete`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' +localStorage.getItem('ACCESS_TOKEN')}
    });
    if (res.status === 200) {
        const json = await res.json(); // JSON 데이터 파싱
        // console.log(shipinfo);
        alert('낚시터 정보 삭제완료');
        fetchSpotInfo()
    } else if(res.status===500){
        alert('배정보 삭제에 실패했습니다');
    }else{
      alert('서버와의 통신이 원활하지않습니다!')
    }
  }else{
    return ;
  }
}



useEffect(() => {
    // const user = getLoginUserInfo();
    // setUserInfo(user);
    // console.log(userInfo);
    // 배 정보를 가져오는 함수
    const user =getLoginUserInfo();
    setUserInfo(user);
    fetchSpotInfo();

    // fetchShipInfo();
  }, []);

  return (
    <section className="MyPageMainBox">
      <div className="mainbox1">
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

        <div className="userinfobox">
          <div className='userinfoWrap'>
            <div className="profilebox">
              {spotInfo.spotImageLocation && spotInfo.spotImageLocation.length > 0 ? (<img className="my-profile" title="마이페이지" src={spotInfo.spotImageLocation[0]} />) : ( <img className="my-profile" title="마이페이지" src={require('./../icons/defaultProfile.png')} />)}
            </div>
            <div className='namebox'>
                  <div className="nickName">
                      {spotInfo.spotName ? <span>{spotInfo.spotName}</span> : <span>등록된 낚시터가  없습니다.</span>}
                  </div>
                  <div className="content">
                      {spotInfo.spotDescription ? <span>{spotInfo.spotDescription}</span> : <span>낚시터를 등록해주세요.</span>}
                  </div>
            </div>
          </div>
        </div>
                    <div className='binfo-btbox'>
                          {spotInfo && spotInfo.spotId ? (
                            <>
                              <button className='binfo-isbtn' onClick={deletespot}>낚시터 삭제하기</button>
                              {/* <button className='binfo-isbtn'>배 정보 수정하기</button> */}
                            </>
                              ) : (
                              <button className='binfo-isbtn'><Link to={'/myquery'}>글 등록하기</Link></button>
                            )}
                    </div>

        <div className="rvbox">
          <h2>리뷰 게시판</h2>
          <p>아직 작성된 리뷰가 없습니다</p>
        </div>

        <div className="rvbox2">
          <h2>예약 현황</h2>
          <p>아직 작성된 글이 없습니다</p>
        </div>
      </div>

      <MpList />
    </section>
  );
};

export default MpFsInfo;