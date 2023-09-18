import React, { useEffect } from "react";
import Header from "../Components/Header";
import Welcome from "../Components/Welcome";
import Tasks from "../Components/Tasks";
import AddTask from "../Components/AddTask";
import { getAllTasks } from "../redux/slises/tasksSlise";
import { useDispatch, useSelector } from "react-redux";
import { active, checkIsAuth } from "../redux/slises/authSlise";
import Skeleton from "../Components/Skeletons/SkeletonLoading";

function Main() {
  const isActive = useSelector(active)
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  return (
    <>
      {isAuth ? (
        <>
          <Header />
          <Tasks />
          <AddTask />
        </>
      ) : (
        !isActive ? (
          <Skeleton />
        ) : (
          <Welcome />
        )
      )}
    </>
  );
}

export default Main;
