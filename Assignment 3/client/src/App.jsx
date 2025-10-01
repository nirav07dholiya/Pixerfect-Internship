import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AddBlog from "./pages/AddBlog";
import ViewBlog from "./pages/ViewBlog";
import axios from "axios";
import Login from "./pages/login";
import Register from "./pages/register";
import MyBlogs from "./pages/MyBlogs";

const PrivateRoute = ({ children }) => {
  const userData = localStorage.getItem("user-data");
  console.log({ userData });
  return userData ? children : <Navigate to="/register" />;
};

const AuthRoute = ({ children }) => {
  const userData = localStorage.getItem("user-data");
  console.log({ userData });
  return !userData ? children : <Navigate to="/register" />;
};

const App = () => {
  const [userExist, setUserExist] = useState(false);
  const [fetchData, setFetchData] = useState(false);

  useEffect(() => {
    console.log("hello");
    const getUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/users/get-user-data",
          { withCredentials: true }
        );
        console.log({ response });
        console.log("User Data:", response.data.user);
        if (response.data?.user) {
          localStorage.setItem("user-data", JSON.stringify(response.data.user));
          setUserExist(true);
        } else {
          localStorage.removeItem("user-data");
          setUserExist(false);
        }
      } catch (error) {
        // setUserExist(true);
        console.error("Error fetching user data:", error);
      }
    };
    getUserData();
  }, [fetchData]);

  const fetchDataByComponent = () => {
    setFetchData(true);
  };

  console.log({ fetchData });

  return (
    <div className="w-[100vw] h-[100vh] bg-red-3000">
      {userExist && <Navbar />}
      <div
        className={`w-full ${userExist ? "h-[92vh]" : "h-[100vh]"
          } bg-[#FFECC0] flex justify-center items-center`}
      >
        <Routes>
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login registered={fetchDataByComponent} />
              </AuthRoute>
            }
          />
          <Route
            path="/register"
            element={
              <AuthRoute>
                <Register registered={fetchDataByComponent} />
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
        </Routes>
      </div>
    </div>
  );
};

export default App;
