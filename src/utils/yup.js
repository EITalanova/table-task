import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  login: Yup.string()
    .required("Please enter your name")
    .trim()
    .typeError("Must be string")
    .min(1, "Your username is too short")
    .max(150, "Username cannot be longer than 150 characters")
    .matches(/^[a-zA-Z0-9а-яА-ЯІіЇї]+$/, "Special symbols are not allowed"),

  password: Yup.string()
    .required("Please enter your password")
    .trim()
    .min(6, "Your password is too short")
    .max(12, "Password cannot be longer than 12 characters"),
});

export const TableSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .typeError("Must be string")
    .min(1, "Your name is too short")
    .max(16, "Username cannot be longer than 16 characters"),
  email: Yup.string()
    .email("Invalid email")
    .min(6, "Your password is too short")
    .max(30, "Email cannot be longer than 30 characters")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email format"
    ),
  birthday_date: Yup.string()
    .trim()
    .matches(/^\d{2}-\d{2}-\d{2}$/, "Error format"),
  phone_number: Yup.string()
    .trim()
    .max(13, "Username cannot be longer than 13 characters")
    .matches(/^\+380\d{9}$/, "Error format"),
  address: Yup.string()
    .trim()
    .min(1, "Address cannot bcters")
    .max(150, "Address cannot be longer than 150 characters"),
});
