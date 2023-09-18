import React, { useState } from "react";
import { createTask } from "../redux/slises/tasksSlise";
import { createList } from "../redux/slises/listSlise";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function CreateTask() {
  const [category, setCategory] = useState('')
  const [task, setTask] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleCreateTask() {
    dispatch(createTask({ category, task }))
    handleCreateList()
    return navigate('/')
  }
  
  function handleCreateList() {
    dispatch(createList({ category }))
  }

  return (
    <>
      <form className="form_register">
        <label className="label_name">Тема вашей задачи</label>
        <input
          type="text"
          className="input_name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <label className="label_pas">Что предстоит сделать?</label>
        <textarea
          type="text"
          className="area"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleCreateTask} type="submit" className="register_btn">
          Создать задачу
        </button>
      </form>
    </>
  );
}

export default CreateTask;
