import { Route, Routes } from "react-router-dom";
import Blog from "./Blog";
import Blogs from "./Blogs";

const BlogsRoute = () => {
  return (
    <Routes path="/">
      <Route index element={<Blogs />} />
      <Route path=":blogId" element={<Blog />} />
    </Routes>
  );
};

export default BlogsRoute;
