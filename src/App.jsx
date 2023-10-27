import "./App.css";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MyEvents from "./pages/MyEvents";
import Create from "./pages/Create";
import CreateVenue from "./pages/CreateVenue";
import Venues from "./pages/Venues";
import AboutUs from "./pages/AboutUs";
import Events from "./pages/Events";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Concert from "./pages/Concert";
import NightClub from "./pages/NightClub";
import Private from "./pages/Private";

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
        <Route path="/about" element={<AboutUs />} />
        {/* </Route> */}

        {/* <Route element={<LoggedIn />}> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/myevents/create" element={<Create />} />
        <Route path="/myevents/create/venue" element={<CreateVenue />} />
        <Route path="/myevents/create/concert" element={<Concert />} />
        <Route path="/myevents/create/nightclub" element={<NightClub />} />
        <Route path="/myevents/create/private" element={<Private />} />
        <Route path="/events" element={<Events />} />
        {/* </Route> */}

        <Route path="/venues" element={<Venues />} />
      </Routes>
    </div>
  );
}
export default App;
