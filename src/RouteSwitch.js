import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Main from "./Main";
import App from "./App";
import ProfilePage from "./ProfilePage";
import SinglePost from "./SinglePost";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";
import Signup from "./Signup";

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
        <Route path="/signup" element={<Signup />}/>
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/" element={<App />} />
          <Route path="/post/:postid" element={<SinglePost />} />
          <Route path="/home" element={<App />} />
          <Route path="/users/:userid" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;