import React, { Component } from "react";

import { setCategory } from "../redux/filter/slice";
import { filterSelector } from "../redux/filter/selectors";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { fetchCategoryName } from "../graphQL/api";

const mapStateToProps = (state) => ({
  category: filterSelector(state).category,
});

const mapDispatchToProps = (dispatch) => ({
  setCategory: bindActionCreators(setCategory, dispatch),
});

class Categories extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    (async () => {
      const { categories } = await fetchCategoryName();
      this.setState({ categories });
    })();
    // localStorage.setItem("category", "all"); //???
  }

  onChangeActive = ({ target }) => {
    const category = target.outerText.toLowerCase();
    if (target) {
      this.props.setCategory(category);
      localStorage.setItem("category", category);
    }
  };

  render() {
    const activeCategory = this.props.category || "all";
    // ? this.props.category : "all"
    return (
      <div className="navigation">
        <div className="header__navigation">
          {this.state.categories.map((category, index) => {
            return (
              <span
                key={index}
                className={category.name === activeCategory ? "active" : ""}
                onClick={this.onChangeActive}
              >
                {category.name.toUpperCase()}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
}

// export default Categories;
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
