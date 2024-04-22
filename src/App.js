import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/landingPage/Landingpage";
import Current from "./components/CurrentEvents";
import Freezed from "./components/FreezedEvents";
import Analytics from "./components/Analytics";
import Finished from "./components/FinishedEvents";
import Admin from "./components/Admin";
import Home from "./components/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/Home" element={<LandingPage />}>
        <Route path="Finished" element={<Finished />} />
        <Route path="Freezed" element={<Freezed />} />
        <Route path="Current" element={<Current />} />
        <Route index element={<Home />} />
      </Route>
      <Route path="/" element={<LandingPage />}>
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/Admin" element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default App;
