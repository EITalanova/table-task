import { LoginForm } from "../../components/LoginForm/LoginForm";
import { motion } from 'framer-motion';

import style from "./Login.module.css";


const Login = () => {
  return (
    <div className={style.loginContainer}>
      <LoginForm />
      </div>
  );
};

export default Login;
