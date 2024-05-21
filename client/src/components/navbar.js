import React from "react";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./navbar.scss";
import logo from "../images/logoWhite.png";

function Navbar() {
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <strong>
        <a href="/">
          <img src={logo} className="logo" alt="logo" />
        </a>
      </strong>

      <nav ref={navRef}>
        <a href="/">Home</a>
        <a href="/about-tut">About</a>
        <a href="/textExtraction">textExtraction</a>
        <a href="/reviewExtrator">reviewExtractor</a>
        <a href="/temp">temp</a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
