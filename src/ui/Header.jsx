import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <header className="font-pizza flex  items-center justify-between bg-yellow-500  p-4 uppercase sm:px-6 ">
      <Link className="uppercase tracking-widest" to="/">
        Fast React Pizza Co.
      </Link>

      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
