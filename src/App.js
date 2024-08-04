import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Refrigerator from "./pages/Fridge";
import Recipe from "./pages/Recipe/RecipeMain";
import MyRecipe from "./pages/Recipe/MyRecipe";
import LikeRecipe from "./pages/Recipe/LikeRecipe";
import RecipeRecommend from "./pages/Recipe/RecipeRecommend";
import { useState, useEffect } from "react";
import NotFound from "./pages/NotFound";
import { Axios } from "./api/Axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);

    const interceptor = Axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          setIsLoggedIn(false);
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("userToken");
        }
        return Promise.reject(error);
      }
    );
    return () => {
      Axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <>
      <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<Main isLoggedIn={isLoggedIn}/>} />
        <Route
          path="/auth/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/auth/signin" element={<Join />} />
        {isLoggedIn && <Route path="/fridge" element={<Refrigerator />} />}
        <Route path="/recipes" element={<Recipe />} />
        {isLoggedIn && 
        <>
        <Route path="/recipes/my_recipes" element={<MyRecipe isLoggedIn={isLoggedIn}/>} />
        <Route path="/recipes/recommendations" element={<RecipeRecommend isLoggedIn={isLoggedIn}/>} />
        <Route path="/auth/likes" element={<LikeRecipe isLoggedIn={isLoggedIn} />} />
        </>}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
