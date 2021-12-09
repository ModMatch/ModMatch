import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import App from "./App";

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;