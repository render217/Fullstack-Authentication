import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { EditProfile, Login, Profile, Register } from "./pages";
import ProfileLayout from "./Layout/ProfileLayout";
import { useAuth } from "./context/AuthProvider";
import { PrivateRoute } from "./components";

const App = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<ProfileLayout />}>
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
      </Routes>
    </>
  );
};

export default App;
