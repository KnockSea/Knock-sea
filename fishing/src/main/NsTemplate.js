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
  const [linkdetail, setlinkdetail] = useState([]);

  const fetchData = async () => {
    try {
      const responseShip = await fetch(`${API_BASE_URL}${PRODUCTS}/main/ship`);
      const dataShip = await responseShip.json();
      setmainship(dataShip);
  
      const responseSpot = await fetch(`${API_BASE_URL}${PRODUCTS}/main/spot`);
      const dataSpot = await responseSpot.json();
      setmainspot(dataSpot);
  
      const responseEdu = await fetch(`${API_BASE_URL}${EDU}/main/edu`);
      const dataEdu = await responseEdu.json();
      setmainedu(dataEdu);
  
      const responseProductList = await fetch(`${API_BASE_URL}${PRODUCTS}/product-list`);
      const dataProductList = await responseProductList.json();
      setlinkdetail(dataProductList);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    // 링크 변경 시 footer 숨김 처리
    setShowFooter(location.pathname === "/");
  }, [location]);

  return (
    <div>
      <NsHeader />

      <NsMain 
      shipList={mainship} 
      spotList={mainspot} 
      eduList={mainedu}
      linkdetail={linkdetail}
      />

      {showFooter && <NsFootter />}
    </div>
  );
};

export default NsTemplate;
