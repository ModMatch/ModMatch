import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Main from "./Main";
import App from "./App";
import SinglePost from "./SinglePost";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";

function RouteSwitch() {

  function PrivateOutlet() {
    let auth = useAuth().auth;
    if (auth === undefined) {
      return (<div>Loading</div>);
    }
    return (auth ? <Outlet /> : <Main />);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/" element={<App />} />
          <Route path="/post/:postid" element={<SinglePost />} />
          <Route path="/home" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;