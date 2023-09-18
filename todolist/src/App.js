import "./style.css";
import Aside from "./Components/Aside";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EditTask from "./pages/EditTask";
import CreateTask from "./pages/CreateTask";
import ViewPage from "./pages/ViewPage";
import AllTasks from "./pages/AllTasks";
import ListPage from "./pages/ListPage";
import { checkIsAuth, getMe } from "./redux/slises/authSlise";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <>
      {isAuth ? <Aside /> : <div className="emptyAside"></div>}
      <div className="main">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/task/:id" element={<EditTask />} />
          <Route path="/createTask" element={<CreateTask />} />
          <Route path="/allTasks/:id" element={<AllTasks />} />
          <Route path="/viewPage/:id" element={<ViewPage />} />
          <Route path="/listPage/:id" element={<ListPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
