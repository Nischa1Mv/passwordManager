import Home from "./home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Signup from "./Signup";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
