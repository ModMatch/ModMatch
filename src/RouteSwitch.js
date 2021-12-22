import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Main from "./Main";
import App from "./App";
import ProfilePage from "./ProfilePage";
import SinglePost from "./SinglePost";
import GroupPage from "./GroupPage";
import useAuth from "./hooks/useAuth";
import Application from "./Application";
import ResponsePage from "./ResponsePage";
import TagPage from "./TagPage";
import SearchPage from "./SearchPage";
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
          <Route path="/post/:postid/apply" element={<Application />} />
          <Route path="/post/:postid/view" element={<ResponsePage />} />
          <Route path="/home" element={<App />} />
          <Route path="/users/:userid" element={<ProfilePage />} />
          <Route path="/groups" element={<GroupPage />} />
          <Route path="/tags/:tagname" element={<TagPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;