import React from "react";
import "./SideBar.module.css";
import { NavItem } from "react-bootstrap";

function SideBar({ categories }) {
  console.log(categories);
  return (
    <>
      <h1>SideBar</h1>
      <ul className="sidebar d-flex flex-column justify-content-center align-items-center mt-3">
        {categories.map((item, index) =><NavItem key={index}>{item}</NavItem>)}
        <NavItem >Islam</NavItem>
        <NavItem >Islam</NavItem>
        <NavItem >Islam</NavItem>
      </ul>
    </>
  );
}

export default SideBar;
