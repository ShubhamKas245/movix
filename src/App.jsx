import { useEffect } from "react";
import "./App.css";
import { fetchDataFromMovieDB } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import SearchResult from "./pages/searchResult/SearchResult";
import PageNotFound from "./pages/404/PageNotFound";
import Home from "./pages/home/Home";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  async function fetchApiConfig() {
    const res = await fetchDataFromMovieDB("/configuration");
    console.log(res);
    const url = {
      backdrop: res.images.secure_base_url + "original",
      poster: res.images.secure_base_url + "original",
      profile: res.images.secure_base_url + "original",
    };
    dispatch(getApiConfiguration(url));
  }

  const genresCall=async()=>{
    let promises=[];
    let endPoint=["tv","movie"];
    let allGenres={}

    endPoint.forEach((url)=>{
      promises.push(fetchDataFromMovieDB(`/genre/${url}/list`))
    })
    const data=await Promise.all(promises);
    console.log(data)
    data.map(({genres})=>{
      return genres.map((item)=> (allGenres[item.id]=item))
    })
    dispatch(getGenres(allGenres))
  }

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />;
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
