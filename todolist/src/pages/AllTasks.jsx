import React, { useEffect } from "react";
import TaskView from "../Components/TaskView";
import { allTasks, getAllTasks, stateLoading } from "../redux/slises/tasksSlise";
import { addOneView } from "../redux/slises/viewSlise";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import Skeleton from "../Components/Skeletons/SkeletonTasks";

function AllTasks() {
  const tasks = useSelector(allTasks);
  const isLoading = useSelector(stateLoading)
  const dispatch = useDispatch();
  const { id } = useParams()

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  const handleAddTask = (_id) => {
    dispatch(addOneView({ id, _id }))
  };


  return (
    <div className="task_list">
      {isLoading === "pending"
        ? [...new Array(5)].map(() => (
            <div>
              <Skeleton />
            </div>
          ))
        : tasks?.map((item) => <TaskView handleAddTask={handleAddTask} key={item._id} {...item} />)}
    </div>
  );
}

export default AllTasks;
