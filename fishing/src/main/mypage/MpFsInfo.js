import React from "react";
import { Link } from "react-router-dom";
import MpList from "./MpList";
import { getLoginUserInfo } from "../util/login-util";
import { useState } from "react";
import { useEffect } from "react";

const MpFsInfo = () => {


  const [spotInfo, setSpotInfo] = useState({
    spotId: 0,
    category: '',
    spotDescription: '',
    spotLikeCount: 0,
    spotName: '',
    spotImageLocation: []
  });


  const [userInfo, setUserInfo] = useState({
    token: '', // Set default value for name
    userEmail: '', // Set default value for email
    userName : '',
    userGrade : '',
    userId : '',
    userPhone : ''
  });


const fetchSpotInfo = async () => {
    const res = await fetch('http://localhost:8012/api/v1/fishing/getspotinfo', {
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
            {userInfo.userGrade==='OWNER' &&(<Link to={'/mpclass'}><h1>📚 클래스</h1></Link>)}
          </div>
        </div>

        <div className="userinfobox">
          <div className='userinfoWrap'>
            <div className="profilebox">
              {spotInfo && spotInfo[0]?(<img className="my-profile" title="마이페이지" src={spotInfo.spotImageLocation[0]} />) : (<img className="my-profile" title="마이페이지" src={require('./../icons/defaultProfile.png')} />)}
            </div>
            <div className="namebox">
              {spotInfo && spotInfo[0] ? (<div className="nickName">{spotInfo[0].spotName}</div>) : (<div className="nickName">등록된  낚시터가없습니다!</div>)}
              {spotInfo && spotInfo[0] ? (<div  className="content">{spotInfo.spotDescription}</div>):(<div>낚시터 정보를 등록해주세요!</div>)}
            </div>
          </div>
        </div>
            <div className="btbox">
              {spotInfo && spotInfo[0] ?(<><button className='isbtn'><Link to={'/myquery'}>글 삭제하기</Link></button><button className='isbtn'><Link to={'/myquery'}>낚시터 정보 수정하기</Link></button></>):(<button className='isbtn'><Link to={'/myquery'}>글 등록하기</Link></button>)}
              {/* {spotInfo===null &&(<button className="isbtn"><Link to={"/myquery"}>글 등록하기</Link></button>)} */}
              {/* {spotInfo!==null &&(<button className="isbtn"><Link to={"/myquery"}>글 수정하기</Link></button>)} */}
                {/* <button> */}
                  {/* <Link to={'/myinfo'}>배 업체 정보 수정</Link> */}
                  {/* 작성 폼 불러와서 수정 진행 Link 걸어야 함 */}
                {/* </button> */}
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
