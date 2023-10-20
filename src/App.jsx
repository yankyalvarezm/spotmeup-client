import "./App.css";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MyEvents from "./pages/MyEvents";
import Create from "./pages/Create";
import CreateVenue from "./pages/CreateVenue";

import { Routes, Route, Outlet, Navigate } from "react-router-dom";

function App() {
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <div className="App">
      <Routes>
        {/* <Route element={<NotLoggedIn />}> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* </Route> */}

        {/* <Route element={<LoggedIn />}> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/myevents/create" element={<Create />} />
        <Route path="/myevents/create/venue" element={<CreateVenue />} />
        {/* </Route> */}
      </Routes>
    </div>
  );
}
export default App;
