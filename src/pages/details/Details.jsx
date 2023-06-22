import "./style.scss";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Details = () => {
  const {mediaType,id}=useParams();
  const {loading,data}=useFetch(`/${mediaType}/${id}/videos`);
  const {data:credits,loading:creditLoading}=useFetch(`/${mediaType}/${id}/credits`)
    return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
    </div>
  )
}

export default Details