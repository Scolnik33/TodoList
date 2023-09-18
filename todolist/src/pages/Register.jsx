import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { userRegister, checkIsAuth, currentMessage } from "../redux/slises/authSlise";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const isAuth = useSelector(checkIsAuth)
  const message = useSelector(currentMessage)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
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

  const handleRegister = () => {
    dispatch(userRegister({username, password}))
    reset()
  }

  return (
    <>
      <div className="register_logo">Самое время зарегистрироваться</div>
      <form onSubmit={handleSubmit(handleRegister)} className="form_register">
        <label className="label_name">Придумайте никнейм</label>
        <input 
          type="text" 
          className="input_name"
          {...register('username', {
            required: true
          })}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="label_pas">И конечно же пароль</label>
        <input 
          type="text" 
          className="input_pas"
          {...register('password', {
            required: true
          })}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleRegister} className="register_btn">Зарегистрироваться</button>
        <Link to='/login' className="has_acc">Уже есть аккаунт?</Link>
        {(errors.username || errors.password) && <div className="error">{'Все поля обязательны к заполнению'}</div>}
        {message == 'Такой пользователь уже существует' && <div className="error">{message}</div>}
      </form>
    </>
  );
}

export default Register;
