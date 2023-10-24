import { selectUser } from "../../redux/login/loginSelector";
import { useEffect } from "react";
import { Formik, Field, Form, useFormikContext } from "formik";
import { LoginSchema } from "../../utils/yup";
import { thunkUser } from "../../redux/login/loginThunks";
import { motion } from "framer-motion";

import { ReactComponent as ErrorIcon } from "../../assets/svg/login/validationError.svg";
import { ReactComponent as SuccessIcon } from "../../assets/svg/login/validationSuccess.svg";
import { ReactComponent as VisibleIcon } from "../../assets/svg/login/visible.svg";
import { ReactComponent as InvisibleIcon } from "../../assets/svg/login/invisible.svg";
import style from "./LoginForm.module.css";
import { useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { selectUser } from "../../redux/login/loginSelector";
import { useNavigate } from 'react-router-dom';

const InputField = ({ name, placeholder, type }) => {
  const { errors, touched } = useFormikContext();
  const error = touched[name] && errors[name];

  return (
    <div className={style.logFormBox}>
      <Field
        className={style.logFormField}
        type={type}
        name={name}
        placeholder={placeholder}
      />
      {touched[name] && error && (
        <div className={style.messageError}>
          <ErrorIcon />
          <span>{error}</span>
        </div>
      )}

      {touched[name] && !error && (
        <div className={style.messageSuccess}>
          <SuccessIcon />
          <span> Success {name}</span>
        </div>
      )}
    </div>
  );
};

export const LoginForm = () => {

  console.log(useSelector(selectUser));
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [data, setData] = useState();
  console.log(data);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const changePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleSubmit = (data) => {
    const userData = {
      username: data.name,
      password: data.password,
    };

    dispatch(thunkUser(userData));
  };

  return (
    <>
      <motion.div
        className={style.logFormContainer}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 9,
            stiffness: 100,
            restDelta: 0.001,
          },
        }}
      >
        <div className={style.logFormTextBox}>
          <h1 className={style.logFormTitle}>Login</h1>
          <p className={style.logFormDiscr}>
            Please enter your login details to continue using our service:
          </p>
        </div>

        <Formik
          validationSchema={LoginSchema}
          initialValues={{ name: "", password: "" }}
          onSubmit={(data) => {
            console.log(data);
            handleSubmit(data); // Вызов функции handleSubmit, которая отправит данные на сервер.
          }}
        >
          <Form className={style.logFormBox}>
            <InputField type="text" name="name" placeholder="Login" />
            <InputField
              type={passwordVisibility ? "text" : "password"}
              name="password"
              placeholder="Password"
            />

            <button
              className={style.logFormEye}
              onClick={changePasswordVisibility}
            >
              {passwordVisibility ? <VisibleIcon /> : <InvisibleIcon />}
            </button>

            <button
              className={style.logFormLinkBtn}
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>
          </Form>
        </Formik>
      </motion.div>
    </>
  );
};
