import { Route, Routes } from "react-router-dom";
import User from "./User";
import Users from "./Users";

const UsersRoute = () => {
  return (
    <Routes path="/">
      <Route index element={<Users />} />
      <Route path=":userId" element={<User />} />
    </Routes>
  );
};

export default UsersRoute;
