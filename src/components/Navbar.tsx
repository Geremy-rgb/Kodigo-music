import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-purple-600 p-4 flex justify-between items-center relative">
      <Link to="/">
        {/* Logo */}
        <img src="./src/assets/kodigo_logo_nav.png" className="w-[100px]" />
      </Link>

      {/* Botón Hamburger para telefonos */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Links */}
      <ul
        className={`
    flex flex-col md:flex-row gap-4
    absolute md:static bg-purple-600 w-full left-0 md:w-auto
    transition-all duration-300
    z-50
    ${isOpen ? "top-16 p-4" : "top-[-400px]"}
  `}
      >
        <li>
          <Link
            to="/"
            className="hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/library"
            className="hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Library
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}
