import React from "react";
import ItemDetail from "../pages/ItemDetail";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ login }) => {
  return login === true ? <ItemDetail /> : <Navigate to="/login" />;
};

export default PrivateRoute;
