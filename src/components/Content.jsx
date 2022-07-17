import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import ProductBlock from "./ProductBlock";
import ModalCart from "./ModalCart";
import { fetchProductsData } from "../graphQL/api";
import { cartSelector } from "../redux/cart/selectors";
import { filterSelector } from "../redux/filter/selectors";

import { setProducts } from "../redux/products/slice";
import { productSelector } from "../redux/products/selectors";

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

  fetchData = async (categoryName) => {
    const { category } = await fetchProductsData(categoryName);
    this.props.setProducts(category.products);
  };

  componentDidMount() {
    this.fetchData(this.props.category);
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.fetchData(this.props.category);
    }
  }

  render() {
    const category =
      this.props.category.charAt(0).toUpperCase() +
      this.props.category.slice(1); // to utils
    return (
      <div className="content">
        {this.props.opened && <ModalCart />}
        <div className="title">
          <h2>{category}</h2>
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
