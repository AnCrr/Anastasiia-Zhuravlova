import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import PropTypes from "prop-types";

import { filterSelector } from "../../redux/filter/selectors";
import { addProduct, removeProduct } from "../../redux/cart/slice";
import Attributes from "../Attributes";
import { PlusIcon } from "./svg/PlusIcon";
import { MinusIcon } from "./svg/MinusIcon";
import { formatPrice } from "../../utils/formatPrice";

const mapStateToProps = (state) => ({
  currency: filterSelector(state).activeCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: bindActionCreators(addProduct, dispatch),
  removeProduct: bindActionCreators(removeProduct, dispatch),
});

class ModalCartItem extends Component {
  static propTypes = {
    cartItem: PropTypes.object,
    currency: PropTypes.string,
    addProduct: PropTypes.func,
    removeProduct: PropTypes.func,
  };

  static defaultProps = {
    cartItem: {},
    currency: "USD",
  };

  defineBackgroundColor(item) {
    if (item.value.startsWith("#")) {
      return item.value;
    }
  }

  handleAddProduct = () => {
    const { addProduct, cartItem } = this.props;
    addProduct(cartItem);
  };

  handleRemoveProduct = () => {
    const { removeProduct, cartItem } = this.props;
    const { id, activeAttributes } = cartItem;
    removeProduct({ id, activeAttributes });
  };

  renderPrices() {
    const { currency, cartItem } = this.props;
    const { prices } = cartItem;

    return prices.map((price, index) => {
      return (
        price.currency.label === currency && (
          <p key={index}>
            {price.currency.symbol}
            {formatPrice(price.amount)}
          </p>
        )
      );
    });
  }

  render() {
    const { brand, name, attributes, activeAttributes, count, gallery } =
      this.props.cartItem;
    return (
      <div className="modal__cart-item">
        <div className="modal__cart-item__info">
          <p className="modal__cart-item__title">{brand}</p>
          <p className="modal__cart-item__title">{name}</p>
          <span className="modal__cart-item__price">{this.renderPrices()}</span>

          <Attributes
            className="attributes--modal"
            attributes={attributes}
            activeAttributes={activeAttributes}
            isProduct={false}
          />
        </div>

        <div className="modal__cart-item__actions">
          <button onClick={this.handleAddProduct}>
            <div className="modal__cart-item__actions--vectors">
              <PlusIcon />
            </div>
          </button>
          <span>{count}</span>
          <button onClick={this.handleRemoveProduct}>
            <div className="modal__cart-item__actions--vectors">
              <MinusIcon />
            </div>
          </button>
        </div>
        <div className="modal__cart-item__image">
          <img src={gallery[0]} alt="product" />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalCartItem);
