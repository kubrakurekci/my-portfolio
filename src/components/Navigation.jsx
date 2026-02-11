import React from "react";
import navbarLabels from "../locales/tr.json";
function Navigation() {
  return (
    <div className="navbar fixed top-0 bg-transparent ">
      <div className="flex-1">
        <a className="text-xl"></a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li className="nav-buttons">
            <a href="#hero">{navbarLabels.nav.home}</a>
          </li>
          <li className="nav-buttons">
            <a href="#projects">{navbarLabels.nav.projects}</a>
          </li>
          <li className="nav-buttons">
            <a href="#contact">{navbarLabels.nav.contact}</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Navigation;
