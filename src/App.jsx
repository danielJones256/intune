/* eslint-disable react/react-in-jsx-scope */
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/callback" element={<Search />}></Route>
    </Routes>
  );
}

export default App;
