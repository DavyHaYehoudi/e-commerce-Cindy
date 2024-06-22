import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";

const Dropdown = ({
  title,
  body,
  headerClassName,
  bodyClassName,
  linkPath,
  linkText,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggleDropdownOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div
        className={`${headerClassName} ${isOpen ? "open" : ""}`}
        onClick={toggleDropdownOpen}
      >
        <p>{title}</p>
        <button
          className={`rotate ${isOpen ? "rotate-open" : ""}`}
          aria-label="Ouvrir son contenu"
        >
          <IoIosArrowUp aria-hidden="true" />
        </button>
      </div>
      <div
        className={`${bodyClassName} ${isOpen ? "open" : ""}`}
        dangerouslySetInnerHTML={body()}
      ></div>{" "}
      <div className="link-dropdown underline">
        {linkPath && isOpen && <Link to={linkPath}>{linkText}</Link>}
      </div>
    </>
  );
};

export default Dropdown;
