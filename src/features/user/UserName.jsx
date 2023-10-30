import React from "react";
import { useSelector } from "react-redux";

function UserName() {
  const name = useSelector((store) => store.user.userName);
  return <div className="hidden text-sm font-semibold   sm:block">{name}</div>;
}

export default UserName;
