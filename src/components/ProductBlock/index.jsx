import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { addProduct } from "../../redux/cart/slice";
import { getCookie } from "../../utils/cookies";
import { OUT_OF_STOCK } from "../../constants";
import { CartIcon } from "./svg/CartIcon";
import { formatPrice } from "../../utils/formatPrice";

const mapDispatchToProps = (dispatch) => ({
  addProduct: bindActionCreators(addProduct, dispatch),
});

class ProductBlock extends Component {
  static propTypes = {
    product: PropTypes.object,
    addProduct: PropTypes.func,
  };

  static defaultProps = {
    product: {},
  };

  handleAddItem = () => {
    const { product, addProduct } = this.props;
    const { attributes } = product;
    const activeAttributes = attributes.map((attr) => ({
      id: attr.id,
      value: attr.values[0],
    }));
    const productInfo = { ...product, activeAttributes };

    addProduct(productInfo);
  };

  render() {
    const { product } = this.props;
    const { inStock, id, gallery, name, brand, prices } = product;
    return (
      <div
        ref={this.ref}
        className={`content__products__block ${!inStock ? "unactive" : ""}`}
      >
        <div className="content__products__block-image">
          {!inStock && <p>{OUT_OF_STOCK}</p>}
          <Link to={`/product/${id}`}>
            <img src={gallery[0]} alt="product" />
          </Link>
          <CartIcon
            className="content__products__block-icon"
            onClick={this.handleAddItem}
          />
        </div>
        <div className="--space-base"></div>
        <div className="content__products__block-info">
          <div className="content__products__block-title">
            <p>{name}</p>
            <p>{brand}</p>
          </div>
          <span className="content__products__block-price">
            {prices.map(
              (price, index) =>
                price.currency.label === getCookie("activeCurrency") && (
                  <p key={index}>
                    {price.currency.symbol}
                    {formatPrice(price.amount)}
                  </p>
                )
            )}
          </span>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(ProductBlock);
