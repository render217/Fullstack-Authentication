import http from "./intance.js";
//
export const loginUser = (credentials) => http.post("/auth/login", credentials);
export const registerUser = (credentials) =>
  http.post("/auth/register", credentials);

export const logoutUser = () => http.get("/auth/logout");

//
export const getUserProfile = () => http.get("/user");

export const updateUserProfile = (data) => http.patch("/user", data);

export const deleteUser = () => http.delete("/user");

export const updateImageProfile = (formData) =>
  http.post("/updateImage", formData);

  