import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import { removeTask } from "../redux/slises/tasksSlise";

function TaskBlock({ _id, category, task }) {
  const dispatch = useDispatch();

  function handleRemoveTask() {
    dispatch(removeTask(_id));
  }

  return (
    <div className="task_list_item">
      <div className="tema">{category}</div>
      <div className="task">{task}</div>
      <Link to={`/task/${_id}`}>
        <AiFillEdit className="edit" />
      </Link>
      <AiOutlineDelete onClick={handleRemoveTask} className="trash_can" />
    </div>
  );
}

export default TaskBlock;
