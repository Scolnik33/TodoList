import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillPlusCircle } from 'react-icons/ai'

function AddTask() {
  return (<div className='add_task'>
    <Link to={'/'} className='plus'><AiFillPlusCircle /></Link>
  </div>)
}

export default AddTask