import React from "react";
import { Link } from "react-router-dom"
import Search from "./Search"

function Header(){
  return (
    <div id="top-bar">
      <div id="auth-links">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
      <div id="search">
        <Search />
      </div>
    </div>
  );
};

export default Header;
