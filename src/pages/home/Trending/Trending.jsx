import { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import '../style.scss';
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Trending = () => {

  const [endPoint,setEndPoint]=useState("day");

  const {data,loading}=useFetch(`/trending/all/${endPoint}`)


  const onTabChange=(tab)=>{
    setEndPoint(tab==="day" ? "day" : "week");
  }

  return (
    <div className="carouselSection">
      <ContentWrapper >
        <div className="carouselTitle">Trending</div>
        <SwitchTabs data={["days","Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  )
}

export default Trending