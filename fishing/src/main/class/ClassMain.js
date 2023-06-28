import React, { useState,useEffect  } from 'react';
import './scss/ClassMain.scss';
// import './scss/reset.scss';
import { Route, Routes,Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { API_BASE_URL } from '../../config/host-config';

const handleLogin = (e) => {
  

    e.preventDefault();

      // 회원가입 서버 요청
     
    };

    const requestHeader = {
        'content-type': 'application/json'
      };
      

    // const API_BASE_URL = 'http://localhost:8012/api/v1/edu';


    
  // 렌더링 후 실행함수

 

function ClassMain() {

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(8);
  const [totalItemCount, setTotalItemCount] = useState(0);
  
  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };
    
    const [edus, setEdus] = useState([]);

      useEffect(()=>{
        fetch(`${API_BASE_URL}/api/v1/edu?page=${page}&size=${size}`, { 
            method: 'GET',
            headers: requestHeader
          })
            .then(res => {
              if (res.status === 200) return res.json();
             else {
                alert('서버가 불안정합니다');
              }
            })
            .then(json => {
              console.log(json);   //->이걸 상태관리 변수인 todos에 셋팅하면 화면에 그려짐
              setEdus(json);
              // console.log(json.pageInfo.totalCount);
              // console.log('edus',edus);
              setTotalItemCount(json.pageInfo.totalCount);

            });
        }, [page]);

      const TopList = [
        { id: '12', feedImg: 'https://cdn.pixabay.com/photo/2023/06/07/18/14/giraffes-8047856_1280.jpg', star: '★★★★★', title: '기린아 안녕', place: '부둣가', price: 10000 },
        { id: '123', feedImg: 'https://cdn.pixabay.com/photo/2023/05/05/11/07/sweet-7972193_1280.jpg', star: '★★★★★', title: '오늘 과자먹어요', place: '낚시터', price: 20000 },
        { id: '1234', feedImg: 'https://cdn.pixabay.com/photo/2023/05/05/11/07/sweet-7972193_1280.jpg', star: '★★★★★', title: '오늘 과자먹어요', place: '낚시터', price: 20000 },
        { id: '돔쟁123이', feedImg: 'https://cdn.pixabay.com/photo/2023/05/05/11/07/sweet-7972193_1280.jpg', star: '★★★★★', title: '오늘 과자먹어요', place: '낚시터', price: 20000 },
      ];

      const [filter, setFilter] = useState('');

      const handleFilterChange = (event) => {
        setFilter(event.target.value);
      };

    return(
      edus.length > 0  && (
          <div className="class-container">
        <div className="class-wrap">
            <div id="class-header">
                <div className="class-banner"></div>
            </div>
            <div className='content-wrap'>
                <div className="class-HOT">
                    <p><span className='class-list-title'>HOT! </span>지금 인기 많은 클래스</p>
                    <div className='lists'>
                            {TopList.map((t) => (
                                    <div className="class-list-1" key={t.eduId}>
                                      <div className="writer" data-id={t.eduId}></div>
                                    <div className="list-img-wrapper">
                                        <img src={t.feedImg} alt="" id="list-img" />
                                    </div>
                                    <div className="list-text">
                                        <div className='list-title-wrap list-t'>
                                            <div className="list-star-rating">{t.reviewAverage}</div>

                                            <div className="userId">{t.userName}</div>
                                        </div>
                                        <div className="text-place list-t">위치 : {t.eduLocation}</div>
                                        <div className="text-price">가격 : {t.eduPrice}원</div>
                                        <div className="text-title list-t">{t.eduTitle}</div>

                                    </div>
                                    </div>
                                ))}
                        </div>       
                </div>
                <hr/>
                <div className="class-list-wrap">
                    <div className='class-list-top'>
                        <span className='class-list-title'>전체 클래스</span>
                        <div className='class-filter'>
                        <select value={filter} onChange={handleFilterChange}>
                            <option value="">전체보기</option>
                            <option value="popular">인기 순</option>
                            <option value="Deadline approaching">마감 임박 순</option>
                          </select>
                        </div>
                    </div>

                    <div className="class-list">
                        <div className='lists'>
                        
                            {edus.map((f) => (
                            <Link to={`/classdetail/${f.eduId}` } style={{ color: 'black', textDecoration: 'none' }}> 
                                    <div className="class-list-1" key={f.eduId}>
                                    <div className="writer" data-id={f.eduId}></div>
                                    <div className="list-img-wrapper">
                                        <img src={f.mainImage} alt="" id="list-img" />
                                    </div>
                                    <div className="list-text">
                                        <div className='list-title-wrap list-t'>
                                        <div className="list-star-rating">
                                          {f.reviewAverage}
                                            {f.reviewAverage === 0 && "☆☆☆☆☆"}
                                            {f.reviewAverage === 1 && "☆☆☆☆⭐"}
                                            {f.reviewAverage === 2 && "☆☆☆⭐⭐"}
                                            {f.reviewAverage === 3 && "☆☆⭐⭐⭐"}
                                            {f.reviewAverage === 4 && "☆⭐⭐⭐⭐"}
                                            {f.reviewAverage === 5 && "⭐⭐⭐⭐⭐"}
                                          </div>
                                            <div className="userId">{f.userName}</div>
                                        </div>
                                        <div className="text-place list-t">🚩위치 : {f.eduLocation}</div>
                                        <div className="text-price list-t">💰가격 : {f.eduPrice}</div>
                                        <div className="text-title list-t">💙{f.eduTitle}</div>
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