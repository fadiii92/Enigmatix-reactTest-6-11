import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom'
import { retireveProducts } from '../redux/productActions';

function Header() {
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { pathname } = useLocation();
  const { cetagory } = useParams();
  const dispatch = useDispatch()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    dispatch(retireveProducts())
  }, [dispatch])

  const products = useSelector(state => state.ProductReducer.products)

  const categories = Array.from(new Set(products.map(item => item.category)));





  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/"
              className="hover:text-indigo-400 transition-colors duration-300"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/todo"
              className="hover:text-indigo-400 transition-colors duration-300"
            >
              Todo
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/addItem"
              className="hover:text-indigo-400 transition-colors duration-300"
            >
              Add Item
            </NavLink>
          </li>
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center px-3 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onClick={toggleDropdown}
            >
              <span>
                {pathname.includes(cetagory)
                  ? cetagory.charAt(0).toUpperCase() +
                  cetagory.slice(1).toLowerCase()
                  : 'Browse'}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`ml-1 h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-700 shadow-lg rounded-lg z-50">
                <ul className="py-2">

                  {categories.map((item) => (
                    <li className="hover:bg-gray-600 px-4 py-2 cursor-pointer">
                      <Link to={`/cetagories/${item}`}>
                        {item}
                      </Link>
                    </li>

                  ))}
                </ul>
              </div>
            )}
          </div>
        </ul>
      </nav>
    </header>
  )
}

export default Header
