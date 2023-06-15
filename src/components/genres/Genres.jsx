import { useSelector } from "react-redux";
import "./style.scss";


const Genres = ({data}) => {
    const {genre}=useSelector((state)=>state.home)
  return (
    <div className="genres">Genres</div>
  )
}

export default Genres