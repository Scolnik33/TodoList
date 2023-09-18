import React from "react";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";

function TaskViewBlock({ _id, category, task }) {
  return (
    <div className="task_list_item">
      <div className="tema">{category}</div>
      <div className="task">{task}</div>
      <Link to={`/task/${_id}`}>
        <AiFillEdit className="edit2" />
      </Link>
    </div>
  );
}

export default TaskViewBlock;