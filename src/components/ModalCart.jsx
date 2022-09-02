import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { createRef } from "react";
import PropTypes from "prop-types";

import ModalCartItem from "./ModalCartItem";
import { cartSelector } from "../redux/cart/selectors";
import { openModal } from "../redux/cart/slice";
import { calcTotalCount, getCurrencySymbol } from "../utils/cart";
import { filterSelector } from "../redux/filter/selectors";
import { MY_BAG, TOTAL, VIEW_BAG, CHECK_OUT } from "../constants";
import { EmptyCart } from "./EmptyCart";
import { formatPrice } from "../utils/formatPrice";

const mapStateToProps = (state) => ({
  cartItems: cartSelector(state).items,
  totalPrice: cartSelector(state).totalPrice,
  currencies: filterSelector(state).currencies,
});

const mapDispatchToProps = (dispatch) => ({
  openModal: bindActionCreators(openModal, dispatch),
});

class ModalCart extends Component {
  static propTypes = {
    cartItems: PropTypes.arrayOf(PropTypes.object),
    totalPrice: PropTypes.number,
    currencies: PropTypes.arrayOf(PropTypes.object),
    openModal: PropTypes.func,
  };

  static defaultProps = {
    cartItems: [],
    totalPrice: 0,
    currencies: [],
  };

  ref = createRef();

  state = {
    totalCount: 0,
  };

  componentDidMount() {
    const { cartItems } = this.props;
    const totalCount = calcTotalCount(cartItems);
    this.setState({ totalCount });
    document.addEventListener("click", this.handleOutsideClick, false);
  }

  componentDidUpdate(prevProps) {
    const { cartItems } = this.props;
    const cartItemsCount = calcTotalCount(cartItems);
    const prevItemsCount = calcTotalCount(prevProps.cartItems);
    if (cartItemsCount !== prevItemsCount) {
      this.setState({ totalCount: cartItemsCount });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick, false);
  }

  handleCloseModal = () => {
    const { openModal } = this.props;
    openModal(false);
    this.changeBodyStyle();
  };

  handleOutsideClick = (event) => {
    const { current } = this.ref;
    const { openModal } = this.props;
    if (!event.path.includes(current)) {
      openModal(false);
      this.changeBodyStyle();
    }
  };

  changeBodyStyle() {
    document.body.style.overflow = "scroll";
  }

  render() {
    const { totalCount } = this.state;
    const { cartItems, currencies, totalPrice } = this.props;
    const itemsCount = `${totalCount} item${totalCount > 1 ? "s" : ""}`;
    return (
      <div className="modal">
        <div className="modal__content" ref={this.ref}>
          <div className="modal__header">
            <p>{MY_BAG},</p>
            <p>{itemsCount}</p>
          </div>

          {cartItems.length > 0 ? (
            <div className="modal__products">
              {cartItems.map((cartItem, index) => (
                <ModalCartItem
                  key={`${cartItem.id}_${index}`}
                  cartItem={cartItem}
                />
              ))}
            </div>
          ) : (
            <EmptyCart />
          )}

          <div className="modal__content-info">
            <p>{TOTAL}</p>
            <p>
              {getCurrencySymbol(currencies)}
              {formatPrice(totalPrice)}
            </p>
          </div>
          <div className="modal__content-bottom">
            <Link to="/cart">
              <div
                onClick={() => this.handleCloseModal()}
                className="button button--modal button--modal--view"
              >
                {VIEW_BAG}
              </div>
            </Link>
            <div className="button button--modal button--modal--check">
              {CHECK_OUT}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalCart);
