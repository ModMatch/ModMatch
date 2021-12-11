import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Main from "./Main";
import App from "./App";
import useAuth from "./hooks/useAuth";

function RouteSwitch() {

  function PrivateOutlet() {
    let auth = useAuth().auth;
    return auth ? <Outlet /> : <Main />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/home" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;