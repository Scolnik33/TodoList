import React, { useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { selectedView, deleteSelectedView, viewItems, loadingViewItemsState } from "../redux/slises/viewSlise";
import { useDispatch, useSelector } from "react-redux";
import TaskViewBlock from "../Components/TaskViewBlock";
import Skeleton from "../Components/Skeletons/SkeletonTasks";

function ViewPage() {
  const items = useSelector(viewItems);
  const isLoading = useSelector(loadingViewItemsState)
  const dispatch = useDispatch();
  const { id } = useParams();
  
  useEffect(() => {
    dispatch(selectedView(id));
  }, [id]);

  const deleteView = (_id) => {
    dispatch(deleteSelectedView({id, _id}))
  };

  return (
    <div className="viewPage">
      {isLoading === "pending"
        ? [...new Array(5)].map(() => (
            <div>
              <Skeleton />
            </div>
          ))
        : items?.map((item) => <TaskViewBlock deleteView={deleteView} key={item._id} {...item} />)}
      <Link to={`/allTasks/${id}`} state={items} className="plus">
        <AiFillPlusCircle />
      </Link>
    </div>
  );
}

export default ViewPage;