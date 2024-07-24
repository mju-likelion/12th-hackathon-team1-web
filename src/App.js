import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Main from './pages/Main';
import Login from './pages/Login';
import Join from './pages/Join';
import Refrigerator from "./pages/Fridge";
import Recipe from './pages/Recipe/Recipe';
import MyRecipe from "./pages/Recipe/MyRecipe";
import LikeRecipe from "./pages/Recipe/LikeRecipe";
import RecomRecipe from "./pages/Recipe/RecomRecipe";

function App() {
  return (
    <>
      <Layout />
      <Routes>
        <Route path="/" element={<Navigate to="/main" />}/>
        <Route path="/main" element={<Main />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signin" element={<Join />} />
        <Route path="/fridge" element={<Refrigerator />} />
        <Route path="/recipes" element={<Recipe />} />
        <Route path="/recipes/my_recipes" element={<MyRecipe />} />
        <Route path="/recipes/recommendations" element={<RecomRecipe />} />
        <Route path="/auth/likes" element={<LikeRecipe />} />
      </Routes>
    </>
  );
}

export default App;
