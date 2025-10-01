import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState("");
  const [editRecord, setEditRecord] = useState("");

  const filterData = async () => {
    try {
      console.log({blogData});
      const response = await axios.delete(`http://localhost:8000/api/posts/${blogData._id}`, {
      });
      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("editBlog") !== "") {
      setEditRecord(JSON.parse(localStorage.getItem("editBlog")))
    }
    else setEditRecord("");
  }, [])


  useEffect(() => {
    setBlogData(editRecord)
    console.log(editRecord?._id);
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
        const response = await axios.post("http://localhost:8000/api/posts", {title:newBlog.title, content:newBlog.content}, { withCredentials: true });
        const data = response.data;
        console.log({ data });
      }
      else{
        const response = await axios.put(`http://localhost:8000/api/posts/${newBlog._id}`, {title:newBlog.title, content:newBlog.content}, { withCredentials: true });
        const data = response.data;
        console.log({ data });
      }

      setError("");

      localStorage.setItem("editBlog", JSON.stringify(""));
      setBlogData({ title: "", content: "" });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[50vw] h-[90vh] rounded  px-4 py-2 flex flex-col gap-2">
        <p className="text-2xl font-semibold mb-3">Add New Blog</p>
        <div className="flex flex-col gap-0">
          <input
            type="text"
            name="title"
            value={blogData.title}
            required
            onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
            className="border-2 border-black p-2 mb-1 rounded-lg focus:outline-none"
            placeholder="Blog Title"
          />
          {error === "title" && <p className="text-red-500 mb-1 text-sm">Title is required</p>}
        </div>
        <div className="flex flex-col">
          <textarea
            name="content"
            value={blogData.content}
            onChange={(e) =>
              setBlogData({ ...blogData, content: e.target.value })
            }
            required
            className="border-2 border-black p-2 mb-1 rounded-lg h-[55vh] focus:outline-none"
            placeholder="Blog Content"
          ></textarea>
          {error === "content" && <p className="text-red-500 mb-1">Content is required</p>}
        </div>
        <button className="bg-[#B95E82] text-[#FFECC0] px-4 py-2 rounded-lg cursor-pointer" onClick={() => AddData()}>
          {editRecord ? "Update Blog" : "Add Blog"}
        </button>
      </div>
    </div>
  );
};

export default AddBlog;