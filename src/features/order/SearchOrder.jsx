import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="w-27 rounded-full px-4 py-2 text-sm text-stone-400 transition-all duration-300 focus:outline-none focus:ring  focus:ring-yellow-500  sm:w-64  sm:focus:w-72 "
          placeholder="Search order Status #"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}

export default SearchOrder;
