import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { cartSelector } from "../redux/cart/selectors";
import { filterSelector } from "../redux/filter/selectors";
import CartItem from "../components/CartItem";
import { calcTotalCount } from "../utils/cart";
import { getCookie } from "../utils/cookies";
import { CART, TAX, QUANTITY, TOTAL, ORDER } from "../constants";
import { formatPrice } from "../utils/formatPrice";

const mapStateToProps = (state) => ({
  cartItems: cartSelector(state).items,
  totalPrice: cartSelector(state).totalPrice,
  currencies: filterSelector(state).currencies,
});

class Cart extends Component {
  static propTypes = {
    cartItems: PropTypes.arrayOf(PropTypes.object),
    totalPrice: PropTypes.number,
    currencies: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    cartItems: [],
    totalPrice: 0,
    currencies: [],
  };

  state = {
    totalCount: 0,
  };

  componentDidMount() {
    const { cartItems } = this.props;
    const totalCount = calcTotalCount(cartItems);
    this.setState({ totalCount });
  }

  componentDidUpdate(prevProps) {
    const { cartItems } = this.props;
    const cartItemsCount = calcTotalCount(cartItems);
    const prevItemsCount = calcTotalCount(prevProps.cartItems);
    if (cartItemsCount !== prevItemsCount) {
      this.setState({ totalCount: cartItemsCount });
    }
  }

  renderEmptyCart() {
    return (
      <div>
        <h3>Sorry, your cart is still empty ☹️</h3>
        <br />
        <h4>Go and get something! 😉</h4>
      </div>
    );
  }

  render() {
    const { totalCount } = this.state;
    const { cartItems, totalPrice, currencies } = this.props;
    const tax = Number((totalPrice * 21) / 100);
    return (
      <div className="cart">
        <div className="cart__title">
          <h1>{CART}</h1>
        </div>
        {cartItems.length > 0 ? (
          <div className="cart__content">
            {cartItems.map((cartItem, index) => (
              <CartItem key={index} cartItem={cartItem} />
            ))}
          </div>
        ) : (
          this.renderEmptyCart()
        )}
        <div className="cart__footer">
          <div className="cart__info">
            <div className="cart__info--names">
              <p>{TAX}:</p>
              <p>{QUANTITY}:</p>
              <p>{TOTAL}:</p>
            </div>

            <div className="cart__info--numbers">
              <p>{formatPrice(tax)}</p>
              <p>{totalCount}</p>
              <p>
                {currencies.map((currency) => {
                  if (currency.label === getCookie("activeCurrency")) {
                    return currency.symbol;
                  }
                })}
                {formatPrice(totalPrice)}
              </p>
            </div>
          </div>
          <div className="cart__button">
            <button>{ORDER}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {})(Cart);
