import React, { Component } from "react";
import { Outlet } from "react-router-dom";

// import Header from "../components/Header";

class ContentLayout extends Component {
  render() {
    return (
      <div className="wrapper__content">
        <Outlet />
      </div>
    );
  }
}

export default ContentLayout;
