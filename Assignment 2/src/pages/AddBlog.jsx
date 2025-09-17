import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    author: "",
    content: "",
    createdAt: null,
    lastModified: null,
  });
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editRecord, setEditRecord] = useState("");

  const filterData = () => {
        const allData = JSON.parse(localStorage.getItem("blogData")) || [];
        const newData = allData.filter((data) => data.title != editRecord.title)
        localStorage.setItem("blogData", JSON.stringify(newData))
  }

  useEffect(() => {
    localStorage.getItem("editBlog") && setEditRecord(JSON.parse(localStorage.getItem("editBlog")))
  }, [])
  
  useEffect(()=>{
    setBlogData({title:editRecord.title, author:editRecord.author,content:editRecord.content,createdAt:editRecord.createdAt})
    setIsEdit(true)
  },[editRecord])

  const AddData = () => {
  if (!blogData.title) {
    setError("title");
    return;
  } else if (!blogData.content) {
    setError("content");
    return;
  }

  filterData();

  let newBlog = { ...blogData };

  if (isEdit) {
    newBlog.lastModified = new Date().toLocaleString();
  } else {
    newBlog.createdAt = new Date().toLocaleString();
  }

  setError("");
  const existingData = localStorage.getItem("blogData");
  const parsedData = existingData ? JSON.parse(existingData) : [];
  parsedData.push(newBlog);

  localStorage.setItem("blogData", JSON.stringify(parsedData));
  localStorage.setItem("editBlog", "");
  setBlogData({ title: "", author: "", content: "" });
  navigate("/");
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
          <input
            type="text"
            name="author"
            value={blogData.author}
            onChange={(e) => setBlogData({ ...blogData, author: e.target.value })}
            className="border-2 border-black p-2 mb-1 rounded-lg focus:outline-none"
            placeholder="Author Name (Optional)"
          />
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