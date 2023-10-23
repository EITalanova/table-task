import { LoginForm } from "../../components/LoginForm/LoginForm";

import style from "./Login.module.css";


const Login = () => {
  return (
    <div className={style.loginContainer}>
      <LoginForm />
      </div>
  );
};

export default Login;
