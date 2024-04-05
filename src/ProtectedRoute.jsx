import React from "react";
// import { useLocation, Navigate } from "react-router-dom";
// import {useSelector} from "react-redux"
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  let location = useLocation();

  if (localStorage.getItem("currentuser") === "") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
