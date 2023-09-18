import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";

function ViewBlock({ _id, category, task }) {
  return (
    <div onClick={() => console.log(_id)} className="task_list_item">
      <div className="tema">{category}</div>
      <div className="task">{task}</div>
      <Link to={`/task/${_id}`}>
        <AiFillEdit className="edit" />
      </Link>
      <AiOutlineDelete className="trash_can"/>
    </div>
  );
}

export default ViewBlock;
