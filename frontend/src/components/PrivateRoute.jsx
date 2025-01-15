import React from "react";
import {useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  //const navigate = useNavigate();
  const { token } = useSelector(store => store.authReducer);

  return token ? (
    children
) : (
    <Navigate  to="/auth/login" />
);

};

export default PrivateRoute;
