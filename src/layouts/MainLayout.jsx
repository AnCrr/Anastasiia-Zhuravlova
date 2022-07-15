import React, { Component } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";

class MainLayout extends Component {
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <Header />
          <Outlet />
        </div>
      </div>
    );
  }
}

export default MainLayout;
