import { selectError, selectUser } from "../../redux/login/loginSelector";
import { Formik, Field, Form, useFormikContext } from "formik";
import { LoginSchema } from "../../utils/yup";
import { loginUser } from "../../redux/login/loginSlice";
import { Navigate } from "react-router-dom";
import Notiflix from "notiflix";

import { ReactComponent as ErrorIcon } from "../../assets/svg/login/validationError.svg";
import { ReactComponent as SuccessIcon } from "../../assets/svg/login/validationSuccess.svg";
import { ReactComponent as VisibleIcon } from "../../assets/svg/login/visible.svg";
import { ReactComponent as InvisibleIcon } from "../../assets/svg/login/invisible.svg";
import style from "./LoginForm.module.css";
import { useState } from "react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTableData } from "../../redux/table/tableSelector";
import { fetchTableData } from "../../redux/table/tableThunks";

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
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const error = useSelector(selectError);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const changePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleSubmit = (values) => {
    dispatch(loginUser(values));
  };

  useEffect(() => {
   console.log('first')
    if (user) {
       return <Navigate to="/table" />;
    }
  }, [user]);

  useEffect(() => {
    if (error) {
    
      Notiflix.Notify.failure("Login or password does not exist 🥲 Try again");
    }
  }, [error]);


  return (
    <>
      <div className={style.logFormContainer}>
        <div className={style.logFormTextBox}>
          <h1 className={style.logFormTitle}>Login</h1>
          <p className={style.logFormDiscr}>
            Please enter your login details to continue using our service:
          </p>
        </div>

           <Formik
          validationSchema={LoginSchema}
          initialValues={{ name: "", password: "" }}
           onSubmit={handleSubmit}
        >
          <Form className={style.logFormBox} noValidate>
            <InputField type="text" name="login" placeholder="Login" />
            <InputField
              type={passwordVisibility ? "text" : "password"}
              name="password"
              placeholder="Password"
            />
            <button className={style.logFormEye} onClick={changePasswordVisibility}>
              {passwordVisibility ? <VisibleIcon /> : <InvisibleIcon />}
            </button>
            {error && (
              <div className={style.messageError}>
                <ErrorIcon />
                <span>{error}</span>
              </div>
            )}
            <button className={style.logFormLinkBtn} type="submit">
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};
