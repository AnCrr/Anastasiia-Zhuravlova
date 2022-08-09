import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { fetchCategoryName } from "../graphQL/api";

class Categories extends Component {
  static propTypes = {
    location: PropTypes.string,
    setCategory: PropTypes.func,
  };

  static defaultProps = {
    location: "all",
  };

  state = {
    categories: [],
  };

  componentDidMount() {
    (async () => {
      const { categories } = await fetchCategoryName();
      this.setState({ categories });
    })();
  }

  render() {
    return (
      <div className="navigation">
        <div className="navigation__categories">
          {this.state.categories.map((category, index) => {
            return (
              <Link
                to={`/category/${category.name}`}
                key={index}
                className={
                  category.name === this.props.location ? "active" : ""
                }
                onClick={this.onChangeActive}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Categories;
