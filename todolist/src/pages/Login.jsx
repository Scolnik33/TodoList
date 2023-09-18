import React, { useEffect, useState } from "react";
import { login, checkIsAuth, currentMessage } from "../redux/slises/authSlise";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Login() {
  const message = useSelector(currentMessage)
  const isAuth = useSelector(checkIsAuth)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onSubmit'
  });

  useEffect(() => {
    if (isAuth) {
      return navigate('/')
    }
  }, [isAuth])

  const handleLogin = () => {
    dispatch(login({username, password}))
    reset()
  }

  console.log(message)

  return (
    <>
      <div className="login_logo">Самое время авторизоваться</div>
      <form onSubmit={handleSubmit(handleLogin)} className="form_register">
        <label className="label_name">Введите свой никнейм</label>
        <input
          type="text"
          className="input_name"
          {...register('username', {
            required: true
          })}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="label_pas">Не забудьте про пароль</label>
        <input
          type="text"
          className="input_pas"
          {...register('password', {
            required: true
          })}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleLogin} className="register_btn">
          Авторизоваться
        </button>
        <Link to='/register' className="has_acc">Еще не завели аккаунт?</Link>
        {(errors.username || errors.password) && <div className="error">{'Все поля обязательны к заполнению'}</div>}
        {message == 'Неверный пароль или логин'&& <div className="error">{'Логин или пароль введен неправильно'}</div>}
      </form>
    </>
  );
}

export default Login;
