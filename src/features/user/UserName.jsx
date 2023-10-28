import React from "react";
import { useSelector } from "react-redux";

function UserName() {
  const name = useSelector((store) => store.user.userName);
  return <div className=" text-sm font-semibold md:block">{name}</div>;
}

export default UserName;
