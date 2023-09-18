import React, { useState } from "react";
import { useLocation } from "react-router";
import { AiFillPlusSquare } from "react-icons/ai";

function TaskView({ _id, category, task, handleAddTask }) {
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const id = location.state;
  console.log(visible);

  const handleIcon = (_id) => {
    handleAddTask(_id);
    setVisible(false);
  };

  return (
    <div className="task_list_item">
      <div className="tema">{category}</div>
      <div onClick={() => setVisible(false)} className="task">
        {task}
      </div>
      {!JSON.stringify(id).includes(_id) && visible && (
        <AiFillPlusSquare onClick={() => handleIcon(_id)} className="add_view" />
      )}
    </div>
  );
}

export default TaskView;
