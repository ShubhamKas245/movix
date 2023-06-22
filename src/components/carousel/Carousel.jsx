import { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import Img from "../lazyLoading/LazyLoading";
import PosterFallback from "../../assets/no-poster.png";
import "./style.scss";
import { useSelector } from "react-redux";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Shimmer from "../lazyLoading/Shimmer";
import CircleRating from "../circularRating/CircularRating";
import Genres from "../genres/Genres";

const Carousel = ({ data, loading,endPoint }) => {
  // useRef hook to access the carousel container
  const carouselContainer = useRef();

  // useSelector hook to access the Redux state
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  // navigation function to handle left and right navigation
  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behaviour: "smooth",
    });
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {/* Left navigation arrow */}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        {/* Right navigation arrow */}
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div
                  key={item.id}
                  className="carouselItem"
                  onClick={() => navigate(`/${item.media_type || endPoint}/${item.id}`)}
                >
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_Date).format("MMM D YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
