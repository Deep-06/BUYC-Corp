import React from 'react';
import { Route, Routes } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import { Signup } from '../pages/Signup';
import { Login } from '../pages/Login';
import { CarDetail } from '../pages/CarDetail';
import { AddCar } from '../pages/AddCar';
import { Home } from '../pages/Home';

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/register" element={<Signup />} />
      <Route path="/auth/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/:id"
        element={
          <PrivateRoute>
            <CarDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/addcar"
        element={
          <PrivateRoute>
            <AddCar />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
