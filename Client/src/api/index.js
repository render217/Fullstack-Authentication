import http from "./intance.js";
//
export const loginUser = (credentials) => http.post("/auth/login", credentials);

export const registerUser = (credentials) =>
  http.post("/auth/register", credentials);

export const logoutUser = () => http.get("/auth/logout");

//
export const getUserProfile = () => http.get("/user");

export const updateUserProfile = (formData) => http.patch("/user", formData);

export const deleteUser = () => http.delete("/user");

export const checkLogInStatus = () => http.get("/auth/status");
