import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import PropTypes from "prop-types";

import ProductBlock from "./ProductBlock";
import { fetchProductsData } from "../graphQL/api";
import { setProducts } from "../redux/products/slice";
import { productSelector } from "../redux/products/selectors";
import { withParams } from "./hooks/withParams";

const mapStateToProps = (state) => ({
  products: productSelector(state).products,
});

const mapDispatchToProps = (dispatch) => ({
  setProducts: bindActionCreators(setProducts, dispatch),
});

class Content extends Component {
  static propTypes = {
    location: PropTypes.object,
    params: PropTypes.object,
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    setProducts: PropTypes.func,
  };

  static defaultProps = {
    location: {},
    params: {},
    category: "all",
    products: [],
  };

  componentDidMount() {
    const activeCategory = this.props.params.category;
    this.fetchProducts(activeCategory);
  }

  componentDidUpdate(prevProps) {
    const activeCategory = this.props.params.category;
    const prevCategory = prevProps.params.category;
    if (activeCategory !== prevCategory) {
      this.fetchProducts(activeCategory);
    }
  }

  fetchProducts = async (categoryName) => {
    const { category } = await fetchProductsData(categoryName);
    this.props.setProducts(category.products);
  };

  formatCategoryTitle = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  render() {
    const activeCategory = this.props.params.category;
    const { products } = this.props;
    return (
      <div className="content">
        <div className="title">
          <h2>{this.formatCategoryTitle(activeCategory)}</h2>
        </div>
        <div className="content__products">
          {products.map((product) => (
            <ProductBlock key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(Content));
