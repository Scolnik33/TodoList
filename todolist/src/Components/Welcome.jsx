import React from 'react'
import { Link } from 'react-router-dom'

function Welcome() {
  return (
    <div className='welcome'>
        <h1>TodoList</h1>
        <h3 className='sub_logo'>Твой собственный список задач</h3>
        <Link to="/register" className="btn_register">
            Зарегистрироваться
        </Link>
    </div>
  )
}

export default Welcome