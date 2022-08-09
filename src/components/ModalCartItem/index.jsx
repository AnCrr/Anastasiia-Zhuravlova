import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import PropTypes from "prop-types";

import { filterSelector } from "../../redux/filter/selectors";
import { addProduct, decreaseCount } from "../../redux/cart/slice";
import Attributes from "../Attributes";
import { PlusIcon } from "./svg/PlusIcon";
import { MinusIcon } from "./svg/MinusIcon";

const mapStateToProps = (state) => ({
  currency: filterSelector(state).activeCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: bindActionCreators(addProduct, dispatch),
  decreaseCount: bindActionCreators(decreaseCount, dispatch),
});

class ModalCartItem extends Component {
  static propTypes = {
    cartItem: PropTypes.object,
    currency: PropTypes.string,
    addProduct: PropTypes.func,
    decreaseCount: PropTypes.func,
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

  handleDecreaseCount = () => {
    const { decreaseCount, cartItem } = this.props;
    const { id, activeAttributes } = cartItem;
    decreaseCount({ id, activeAttributes });
  };

  renderPrices() {
    const { currency, cartItem } = this.props;
    const { prices } = cartItem;
    return prices.map((price, index) => {
      return (
        price.currency.label === currency && (
          <p key={index}>
            {price.currency.symbol}
            {price.amount}
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
            className="attributes__modal"
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
          <button disabled={count === 1} onClick={this.handleDecreaseCount}>
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
