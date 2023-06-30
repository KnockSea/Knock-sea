import React, { useEffect, useState } from "react";
import "./scss/NsTemplate.scss";
import { NsHeader } from "./NsHeader";
import NsMain from "./NsMain";
import NsFootter from "./NsFootter";
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL, EDU, PRODUCTS } from "../config/host-config";

const NsTemplate = () => {
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(true);
  const [mainship, setmainship] = useState([]);
  const [mainspot, setmainspot] = useState([]);
  const [mainedu, setmainedu] = useState([]); 

  const mainimgs = () => {

    fetch(`${API_BASE_URL}${PRODUCTS}/main/ship`)
      .then(response => response.json())
      .then(res => {
        setmainship(res);
      });
    fetch(`${API_BASE_URL}${PRODUCTS}/main/spot`)
    .then(response => response.json())
    .then(res => {
      setmainspot(res);      
    });
    fetch(`${API_BASE_URL}${EDU}/main/edu`)
    .then(response => response.json())
    .then(res => {
      setmainedu(res);
    });
     
  }



  useEffect(() => {
    mainimgs();
    // 링크 변경 시 footer 숨김 처리
    setShowFooter(location.pathname === "/");
  }, [location]);

  return (
    <div>
      <NsHeader />

      <NsMain shipList={mainship} spotList={mainspot} eduList={mainedu}/>

      {showFooter && <NsFootter />}
    </div>
  );
};

export default NsTemplate;
