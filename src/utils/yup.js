import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  login: Yup.string()
    .required("Please enter your name")
    .trim()
    .typeError("Must be string")
    .min(1, "Your username is too short")
    .max(150, "Username cannot be longer than 16 characters")
  .matches(/^[a-zA-Z0-9а-яА-ЯІіЇї]+$/, 'Special symbols are not allowed'),
  
  password: Yup.string()
    .required("Please enter your password")
    .trim()
    .min(6, "Your password is too short")
    .max(128, "Password cannot be longer than 12 characters")
});
