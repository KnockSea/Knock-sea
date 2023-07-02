import React, { useState,useEffect  } from 'react';
import './scss/ClassMain.scss';
// import './scss/reset.scss';
import { Route, Routes,Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { API_BASE_URL, EDU } from '../../config/host-config';
import { getLoginUserInfo } from '../util/login-util';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';


const requestHeader = {
      'content-type': 'application/json'
  };

function ClassMain() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(8);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [edus, setEdus] = useState([]);
  const [topFourEdus, setTopFourEdus] = useState([]);
  const [value, setValue] = useState(0);
  const [userInfo, setUserInfo] = useState({
    token: '',
    userEmail: '',
    userName : '',
    userGrade : '',
    userId : '',
    userPhone : ''
  });

  const handlePageChange = (page) => {
    setPage(page);
  };

  // console.log('edus',edus);

  const fetchEdu = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${EDU}?page=${page}&size=${size}`, {
        method: 'GET',
        headers: requestHeader
      });
  
      if (response.status === 200) {
        const json = await response.json();
        // console.log('json', json);
        setEdus(json);
        setTotalItemCount(json.pageInfo.totalCount);
        setTopFourEdus(json.topFour);
        // console.log("topFourEdus", topFourEdus);
      } else {
        alert('서버가 불안정합니다');
        // console.log(response);
      }
    } catch (error) {
      console.error('Error fetching edu:', error);
    }
  };
    
  
   useEffect(()=>{
    const user = getLoginUserInfo();
    setUserInfo(user);
      fetchEdu();
    }, [page]);
 
    const [filter, setFilter] = useState('');

    const handleFilterChange = (event) => {
      setFilter(event.target.value);
    };

    return(
      edus.posts && (
        <div className="class-container">
      <div className="class-wrap">
          <div id="class-header">
              <div className="class-banner"></div>
          </div>
          <div className='content-wrap'>
              <div className="class-HOT">
                  <p><span className='class-list-title'>HOT! </span>지금 인기 많은 클래스</p>
                  <div className='lists'>
                          {topFourEdus.map((t) => (
                            <Link to={`/classdetail/${t.eduId}` } style={{ color: 'black', textDecoration: 'none' }}> 
                                  <div className="class-list-1" key={t.eduId}>
                                    <div className="writer" data-id={t.eduId}></div>
                                  <div className="list-img-wrapper">
                                      <img src={t.mainImage} alt="" id="list-img" />
                                  </div>
                                  <div className="list-text">
                                      <div className='list-title-wrap list-t'>
                                          <div className="list-star-rating">
                                                  <Box
                                                      sx={{
                                                        '& > legend': { mt: 2 } }}
                                                        >
                                                      <Rating name="half-rating" 
                                                      value={t.reviewAverage}
                                                      precision={0.5}
                                                      readOnly />
                                                  </Box>
                                          <span className='review-rate'> ({t.reviewAverage})</span>
                                          </div>
                                          <div className="userId">{t.userName}</div>
                                      </div>
                                      <div className="text-title list-t">💙 {t.eduTitle}</div>
                                      <div className="text-place list-t">🚩 위치 : {t.eduLocation}</div>
                                      <div className="text-price list-t">💰 가격 : {t.eduPrice}원</div>
                                  </div>
                                  </div>
                                  </Link>
                              ))}
                      </div>       
              </div>
              <hr/>
              <div className="class-list-wrap">
                  <div className='class-list-top'>
                      <span className='class-list-title'>전체 클래스</span>
                      {userInfo.userGrade == 'OWNER' && (
                      <div className='class-regi'>
                      <Link to={('/edu')}><div>등록하러 가기</div></Link>
                      {/* <select value={filter} onChange={handleFilterChange}>
                          <option value="">전체보기</option>
                          <option value="popular">인기 순</option>
                          <option value="Deadline approaching">마감 임박 순</option>
                      </select> */}
                      </div>
                      )}
                  </div>

                  <div className="class-list">
                      <div className='lists'>
                      
                          {edus.posts.map((f) => (
                          <Link to={`/classdetail/${f.eduId}` } style={{ color: 'black', textDecoration: 'none' }}> 
                                  <div className="class-list-1" key={f.eduId}>
                                  <div className="writer" data-id={f.eduId}></div>
                                  <div className="list-img-wrapper">
                                      <img src={f.mainImage} alt="" id="list-img" />
                                  </div>
                                  <div className="list-text">
                                      <div className='list-title-wrap list-t'>
                                      <div className="list-star-rating">
                                            <Box
                                                sx={{
                                                  '& > legend': { mt: 2 } }}
                                                  >
                                                <Rating name="half-rating" 
                                                value={f.reviewAverage}
                                                precision={0.5}
                                                readOnly />
                                              </Box>
                                              <span className='review-rate'> ({f.reviewAverage})</span> 
                                        </div>
                                          <div className="userId">{f.userName}</div>
                                      </div>
                                      <div className="text-title list-t">💙 {f.eduTitle}</div>
                                      <div className="text-place list-t">🚩 위치 : {f.eduLocation}</div>
                                      <div className="text-price list-t">💰 가격 : {f.eduPrice}</div>
                                  </div>
                                  </div>
                          </Link>
                              ))}   
                                <div className="page">
                                <Pagination
                                activePage={page}
                                itemsCountPerPage={size}
                                totalItemsCount={totalItemCount}
                                pageRangeDisplayed={5}
                                prevPageText={"‹"}
                                nextPageText={"›"}
                                onChange={handlePageChange}
                                />     
                                </div>                     
                      </div>       
                  </div>
              </div>
          </div>    
      </div>
  </div>
  )
    );
  }
  

  export default ClassMain;