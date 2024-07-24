import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Main from './pages/Main';
import Login from './pages/Login';
import Join from './pages/Join';
import Refrigerator from "./pages/Fridge";
import Recipe from './pages/Recipe';
import MyRecipe from "./components/RecipePage/MyRecipe";

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
      </Routes>
    </>
  );
}

export default App;
