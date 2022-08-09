import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import { filterSelector } from "../../redux/filter/selectors";
import { addProduct, decreaseCount } from "../../redux/cart/slice";
import { PlusIcon } from "./svg/PlusIcon";
import { MinusIcon } from "./svg/MinusIcon";
import { ArrowIcon } from "./svg/ArrowIcon";
import Attributes from "../Attributes";

const mapStateToProps = (state) => ({
  currency: filterSelector(state).activeCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: bindActionCreators(addProduct, dispatch),
  decreaseCount: bindActionCreators(decreaseCount, dispatch),
});

class CartItem extends Component {
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

  state = {
    activeAttributes: this.props.cartItem.activeAttributes,
    activeIdx: 0,
  };

  handleAddProduct = () => {
    const { activeAttributes } = this.state;
    const { cartItem } = this.props;
    this.props.addProduct({ ...cartItem, activeAttributes });
  };

  handleDecreaseCount = () => {
    const { id } = this.props.cartItem;
    const { activeAttributes } = this.state;
    this.props.decreaseCount({ id, activeAttributes });
  };

  handleClickLeftArrow = () => {
    const { activeIdx } = this.state;
    const newIdx = activeIdx === 0 ? 0 : activeIdx - 1;
    this.setState({ activeIdx: newIdx });
  };

  handleClickRightArrow = () => {
    const { activeIdx } = this.state;
    const { gallery } = this.props.cartItem;
    const newIdx = activeIdx === gallery.length - 1 ? activeIdx : activeIdx + 1;
    this.setState({ activeIdx: newIdx });
  };

  renderPrices = () => {
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
  };

  render() {
    const { brand, name, attributes, count, gallery } = this.props.cartItem;
    const { activeAttributes, activeIdx } = this.state;
    return (
      <div className="cart-item">
        <div className="border"></div>
        <div className="cart-item__content">
          <div className="cart-item__info">
            <div className="cart-item__title">
              <h1 className="cart-item__title--brand">{brand}</h1>
              <h1 className="cart-item__title--name">{name}</h1>
            </div>
            <div className="cart-item__price">{this.renderPrices()}</div>
            <Attributes
              attributes={attributes}
              activeAttributes={activeAttributes}
              isProduct={false}
              onSetAttrs={this.handleSetAttrs}
            />
          </div>
          <div className="cart-item__sidebar">
            <div className="cart-item__actions">
              <button onClick={this.handleAddProduct}>
                <div className="cart-item__actions--vectors">
                  <PlusIcon />
                </div>
              </button>
              <span>{count}</span>
              <button disabled={count === 1} onClick={this.handleDecreaseCount}>
                <div className="cart-item__actions--vectors">
                  <MinusIcon />
                </div>
              </button>
            </div>
            <div className="cart-item__image">
              <img src={gallery[activeIdx]} alt="product" />
              <div
                className="cart-item__image--arrow--left"
                onClick={() => this.handleClickLeftArrow()}
              >
                <ArrowIcon rotate={0} />
              </div>
              <div
                className="cart-item__image--arrow--right"
                onClick={() => this.handleClickRightArrow()}
              >
                <ArrowIcon rotate={180} />
              </div>
            </div>
          </div>
        </div>

        <div className="border"></div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
