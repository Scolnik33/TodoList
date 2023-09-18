import React from "react";
import TaskBlock from "./TaskBlock";
import { allTasks } from "../redux/slises/tasksSlise";
import { useSelector } from "react-redux";
import { stateLoading } from "../redux/slises/tasksSlise";
import Skeleton from "./Skeletons/SkeletonTasks";

function Tasks() {
  const tasks = useSelector(allTasks);
  const isLoading = useSelector(stateLoading);

  return (
    <div className="task_list">
      {isLoading === "pending" ? (
        [...new Array(5)].map(() => (
          <div>
            <Skeleton />
          </div>
        ))
      ) : (
        tasks?.map((item) => <TaskBlock key={item._id} {...item} />)
      )}
    </div>
  );
}

export default Tasks;
