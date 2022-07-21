import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import ProductBlock from "./ProductBlock";
import ModalCart from "./ModalCart";
import { fetchProductsData } from "../graphQL/api";
import { cartSelector } from "../redux/cart/selectors";
import { filterSelector } from "../redux/filter/selectors";
import { makeCategoryTitle } from "../utils/makeCategoryTitle";
import { setProducts } from "../redux/products/slice";
import { productSelector } from "../redux/products/selectors";
import Product from "../pages/Product";

const mapStateToProps = (state) => ({
  category: filterSelector(state).category,
  products: productSelector(state).products,
  opened: cartSelector(state).opened,
});

const mapDispatchToProps = (dispatch) => ({
  setProducts: bindActionCreators(setProducts, dispatch),
});

class Content extends Component {
  state = {};

  componentDidMount() {
    this.fetchData(this.props.category || "all");
  }

  componentDidUpdate(prevProps) {
    if (this.props.category && this.props.category !== prevProps.category) {
      this.fetchData(this.props.category);
    }
  }
  // check condition

  fetchData = async (categoryName) => {
    const { category } = await fetchProductsData(categoryName);
    this.props.setProducts(category.products);
  };

  render() {
    return (
      <div className="content">
        {/* <Product /> */}
        {this.props.opened && <ModalCart />}
        <div className="title">
          <h2>
            {this.props.category
              ? makeCategoryTitle(this.props.category)
              : "All"}
          </h2>
          {/* fix */}
        </div>
        <div className="content__products">
          {this.props.products.map((product) => (
            <ProductBlock key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
