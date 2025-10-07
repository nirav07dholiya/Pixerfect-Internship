import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearEdit } from "../redux/slices/user";
import { ADD_POST_ROUTE, HOST } from "../utils";

const AddBlog = () => {
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.user.edit);
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState("");
  const [editRecord, setEditRecord] = useState("");

  useEffect(() => {
    if (edit && edit != "") {
      setEditRecord(edit)
    }
  }, [])

  useEffect(() => {
    setBlogData(editRecord)
  }, [editRecord])

  const AddData = async () => {
    try {
      if (!blogData.title) {
        setError("title");
        return;
      } else if (!blogData.content) {
        setError("content");
        return;
      }
      let newBlog = { ...blogData };

      if (editRecord == "") {
        console.log({ADD_POST_ROUTE});
        const response = await axios.post(ADD_POST_ROUTE, { title: newBlog.title, content: newBlog.content }, { withCredentials: true });
        const data = response.data;
      }
      else {
        console.log("edit");
        console.log({HOST});
        const response = await axios.put(`${HOST}/api/posts/${newBlog._id}`, { title: newBlog.title, content: newBlog.content }, { withCredentials: true });
        const data = response.data;
      }

      setError("");

      dispatch(clearEdit());
      setBlogData({ title: "", content: "" });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[95vw]  md:w-[50vw] h-[88vh] rounded px-4 py-2 flex flex-col gap-3 items-center ">
        <p className="text-2xl font-semibold pt-5 md:pt-0 md:mb-3 ">Add New Blog</p>
        <div className="flex w-full flex-col gap-0">
          <input
            type="text"
            name="title"
            value={blogData.title}
            required
            onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
            className="shadow-md p-2 mb-1 rounded-lg focus:outline-none w-full"
            placeholder="Blog Title"
          />
          {error === "title" && <p className="text-red-500 mb-1 text-sm">Title is required</p>}
        </div>
        <div className="flex flex-col w-full">
          <textarea
            name="content"
            value={blogData.content}
            onChange={(e) =>
              setBlogData({ ...blogData, content: e.target.value })
            }
            required
            className="shadow-xl p-2 mb-1 rounded-lg h-[60vh] focus:outline-none w-full" 
            placeholder="Blog Content"
          ></textarea>
          {error === "content" && <p className="text-red-500 mb-1">Content is required</p>}
        </div>
        <button className="bg-blue-500 w-full text-white shadow-lg px-4 py-2 rounded-lg cursor-pointer" onClick={() => AddData()}>
          {editRecord ? "Update Blog" : "Add Blog"}
        </button>
      </div>
    </div>
  );
};

export default AddBlog;