import React, { use, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import AddBlog from "./pages/AddBlog";
import ViewBlog from "./pages/ViewBlog";
import axios from "axios";
import Login from "./pages/login";
import Register from "./pages/register";
import MyBlogs from "./pages/MyBlogs";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slices/user";
import { GET_USER_DATA_ROUTE } from "./utils";
import Profile from "./pages/Profile";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const userExist = !!user;
  return userExist ? children : <Navigate to="/login" />;
};

const AuthRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const userExist = !!user;
  return userExist ? <Navigate to="/" /> : children;
};

const App = () => {
  const dispatch = useDispatch();
  const view = useSelector((state) => state.user.view);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          GET_USER_DATA_ROUTE,
          { withCredentials: true }
        );
        if (response.data?.user) {
          dispatch(setUser({ user: response.data.user }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (!user) getUserData();
  }, [user,setUser]);

  return (
    <div className="w-[100vw] h-[100vh] bg-red-3000 bg-white flex flex-col items-center">
      <Navbar />
      <div
        className={`w-full ${user ? "h-[83vh] md:h-[90vh]" : "h-[93vh] md:h-[100vh]"
          } flex justify-center items-center overflow-auto my-2`}
      >
        <Routes>
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="/register"
            element={
              <AuthRoute>
                <Register/>
              </AuthRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-blogs"
            element={
              <PrivateRoute>
                <MyBlogs />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-blog"
            element={
              <PrivateRoute>
                <AddBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-blog"
            element={
              <PrivateRoute>
                <ViewBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <div className={`md:hidden w-full h-[7vh] bg-blue-500 flex items-center justify-evenly ${!user ? 'hidden' : 'flex'}`}>
        <NavLink to="/" className="text-white text-lg font-semibold">Home</NavLink>
        <NavLink to="/add-blog" className="text-white text-lg font-semibold h-[4.58vh] w-[15vw]">
          <div className="w-full h-full bg-white  text-blue-500 px-4 py-2 rounded-lg cursor-pointer border-3 flex items-center justify-center">+</div>
        </NavLink>
        <NavLink to="/profile" className="h-[4.58vh] w-[10vw] ">
          <div className="w-full h-full bg-blue-700  text-white px-4 py-2 rounded-full cursor-pointer border-3 flex items-center justify-center">
            {user?.email.charAt(0).toUpperCase()}
          </div>
        </NavLink>
        </div>
    </div>
  );
};

export default App;
