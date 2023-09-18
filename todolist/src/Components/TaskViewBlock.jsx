import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";

function TaskViewBlock({ _id, category, task, deleteView }) {
  return (
    <div className="task_list_item">
      <div className="tema">{category}</div>
      <div className="task">{task}</div>
      <Link to={`/task/${_id}`}>
        <AiFillEdit className="edit" />
      </Link>
      <AiOutlineDelete onClick={() => deleteView(_id)} className="trash_can" />
    </div>
  );
}

export default TaskViewBlock;