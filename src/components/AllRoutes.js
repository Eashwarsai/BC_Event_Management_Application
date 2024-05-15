import React from "react";
import { Route, Routes } from "react-router-dom";
import Finished from "./Events/FinishedEvents";
import Freezed from "./Events/FreezedEvents";
import Current from "./Events/CurrentEvents";
import Home from "./Home";
import Analytics from "./Analytics";
import Admin from "./Admin/Admin";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/Home">
        <Route path="Finished" element={<Finished />} />
        <Route path="Freezed" element={<Freezed />} />
        <Route path="Current" element={<Current />} />z
        <Route index element={<Home />} />
      </Route>
      <Route path="/Analytics" element={<Analytics />} />
      <Route path="/Admin" element={<Admin />} />
    </Routes>
  );
};

export default AllRoutes;
