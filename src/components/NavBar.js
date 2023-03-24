import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import { findTask } from "../features/filter/filterSlice";

export default function NavBar() {
  const [srtext, setSrtext] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findTask(srtext));
  }, [dispatch, srtext]);

  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={logoImg} alt="Task manager Logo" />
        </Link>
        <div className="flex-1 max-w-xs search-field group">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Task"
            className="search-input"
            id="lws-searchTask"
            value={srtext}
            onChange={(e) => setSrtext(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
}
