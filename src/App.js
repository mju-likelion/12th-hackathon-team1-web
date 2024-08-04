import { Navigate, Route, Routes } from "react-router-dom";
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
  }, []);

  return (
    <>
      <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<Main />} />
        <Route
          path="/auth/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/auth/signin" element={<Join />} />
        <Route path="/fridge" element={<Refrigerator />} />
        <Route path="/recipes" element={<Recipe />} />
        <Route path="/recipes/my_recipes" element={<MyRecipe />} />
        <Route path="/recipes/recommendations" element={<RecipeRecommend />} />
        <Route path="/auth/likes" element={<LikeRecipe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
