import React from "react";
import { Route, Routes } from "react-router-dom";
import SingupPage from "../pages/SingupPage";
import LoginPage from "../pages/LoginPage";

const AuthRoutes = () => {
  return (
    <Routes> 
      {/* /auth/login */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SingupPage />} />
    </Routes>
  );
};

export default AuthRoutes;


// /fetch
// /http
// /axios