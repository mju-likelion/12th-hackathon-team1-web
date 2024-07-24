import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Main from './pages/Main';
import Login from './pages/Login';
import Join from './pages/Join';
import Refrigerator from "./pages/Fridge";
import Recipe from './pages/Recipe';

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
        <Route path="/recipe" element={<Recipe />} />
      </Routes>
    </>
  );
}

export default App;
