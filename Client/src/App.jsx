import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { EditProfile, Login, NotFound, Profile, Register, SocialRedirect } from "./pages";
import ProfileLayout from "./Layout/ProfileLayout";

import { PrivateRoute, PublicRoute } from "./components";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route
            index
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route path="social-redirect" element={<SocialRedirect />} />
          <Route path="profile" element={<ProfileLayout />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="update"
              element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
