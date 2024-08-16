import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Pages/Dashboard";
import CreateUser from "./Components/Pages/CreateUser";
import UpdateUser from "./Components/Pages/UpdateUser";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/update-user/:id" element={<UpdateUser />} />
      </Routes>
    </Router>
  );
};

export default App;
