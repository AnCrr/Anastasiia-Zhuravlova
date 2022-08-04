import React, { Component } from "react";
import { Outlet } from "react-router-dom";

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
