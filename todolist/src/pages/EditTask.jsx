import axios from "../utils/axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/slises/tasksSlise";
import { createList } from "../redux/slises/listSlise";

function Task() {
  const [category, setCategory] = useState('')
  const [task, setTask] = useState('')

  const { id } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchTask = useCallback(async () => {
    const { data } = await axios.get(`/oneTask/${id}`);
    setCategory(data.category)
    setTask(data.task)
    return data
  }, []);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  function handleUpdateTask() {
    dispatch(updateTask({ id, category, task }))
    handleCreateList()
    return navigate('/')
  }

  function handleCreateList() {
    dispatch(createList({ category }))
  }

  return (
    <>
      <form className="form_register">
        <label className="label_name">Какая тема на этот раз?</label>
        <input
          type="text"
          className="input_name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <label className="label_pas">Что предстоит сделать еще?</label>
        <textarea
          type="text"
          className="area"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          onClick={handleUpdateTask}
          type="submit"
          className="register_btn"
        >
          Изменить задачу
        </button>
      </form>
    </>
  );
}

export default Task;