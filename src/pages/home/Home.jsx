import Trending from "./Trending/Trending";
import HeroBanner from "./heroBanner/HeroBanner";
import "./style.scss";

const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      <div style={{ height: 1000 }}></div>
    </div>
  );
};

export default Home;
