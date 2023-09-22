import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().required().email("Incorrect email format"),
});
export const RegisterSchema = yup.object().shape({
  email: yup.string().required().email("Incorrect email format"),
  password: yup.string().required().min(4).max(20),
});
export const UpdateProfileSchema = yup.object().shape({
  email: yup.string().required().email("Incorrect email format"),
});
