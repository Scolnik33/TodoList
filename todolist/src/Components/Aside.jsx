import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  allLists,
  listItems,
  removeList,
  loadingList,
} from "../redux/slises/listSlise";
import {
  createView,
  allViews,
  fetchItems,
  removeView,
  loadingState,
} from "../redux/slises/viewSlise";
import { checkIsAuth, getMe } from "../redux/slises/authSlise";
import { exit } from "../redux/slises/authSlise";
import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import SkeletonView from "./Skeletons/SkeletonViews";
import SkeletonList from "./Skeletons/SkeletonViews";

function Aside() {
  const [viewInput, setViewInput] = useState(false);
  const [category, setCategory] = useState("");
  const list = useSelector(listItems);
  const isAuth = useSelector(checkIsAuth);
  const items = useSelector(fetchItems);
  const isLoadingView = useSelector(loadingState);
  const isLoadingList = useSelector(loadingList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(exit());
    dispatch(getMe());
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("name");
  };

  const handleRemoveList = (id) => {
    dispatch(removeList(id));
    return navigate("/");
  };

  const handleRemoveView = (id) => {
    dispatch(removeView(id));
    return navigate("/");
  };

  useEffect(() => {
    dispatch(allViews());
    dispatch(allLists());
  }, []);

  const handleCreateView = () => {
    dispatch(createView({ category, task: category }));
    setViewInput(!viewInput);
    setCategory("");
    setTimeout(() => {
      dispatch(allViews());
    }, 400);
  };

  return (
    <aside className="aside">
      <div className="prof">
        <Link to="/" className="name">
          TodoList
        </Link>
      </div>

      {isAuth && isLoadingView === "pending" ? (
        [...new Array(4)].map(() => (
          <div>
            <SkeletonView />
          </div>
        ))
      ) : (
        <>
          <div className="myView">
            {items.map((item) => (
              <div className="myView_item">
                <Link
                  to={`/viewPage/${item._id}`}
                  className="myView_link"
                  key={item._id}
                >
                  {item.category}
                </Link>
                <AiFillDelete
                  onClick={() => handleRemoveView(item._id)}
                  className="view_delete"
                />
              </div>
            ))}
            <div className="myView_item">
              Добавить группу
              <AiFillPlusCircle
                onClick={() => setViewInput(!viewInput)}
                className="view_plus"
              />
              {viewInput && (
                <>
                  <input
                    type="text"
                    className="view_input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <button
                    onClick={handleCreateView}
                    type="submit"
                    className="view_btn"
                  >
                    Создать
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}

      <div className="myList">
        <div className="myList_logo">My lists</div>
        {isAuth && isLoadingList === "pending"
          ? [...new Array(4)].map(() => (
              <div>
                <SkeletonList />
              </div>
            ))
          : list?.map((item) => (
              <div className="List_item" key={item._id}>
                <Link to={`/listPage/${item._id}`} className="list_link">
                  {item.category}
                </Link>
                <AiFillDelete
                  onClick={() => handleRemoveList(item._id)}
                  className="list_delete"
                />
              </div>
            ))}
      </div>

      {isAuth && (
        <Link onClick={logout} to="/" className="btn_aside">
          Выйти
        </Link>
      )}
    </aside>
  );
}

export default Aside;
