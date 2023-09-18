import React, { useEffect } from "react";
import {
  listItems,
  listTasks,
  removeFromList,
} from "../redux/slises/tasksSlise";
import { useDispatch, useSelector } from "react-redux";
import { stateLoading } from "../redux/slises/tasksSlise";
import Skeleton from "../Components/Skeletons/SkeletonTasks";
import TaskListBlock from "../Components/TaskListBlock";
import { useNavigate, useParams } from "react-router";

function ListPage() {
  const list = useSelector(listItems);
  const isLoading = useSelector(stateLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(listTasks(id));
  }, [id]);

  if (list.length < 1 && isLoading == "success") {
    return navigate("/");
  }

  return (
    <div className="task_list">
      {isLoading === "pending"
        ? [...new Array(5)].map(() => (
            <div>
              <Skeleton />
            </div>
          ))
        : list.map((item) => (
            <TaskListBlock key={item._id} {...item} />
          ))}
    </div>
  );
}

export default ListPage;
