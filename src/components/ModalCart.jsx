import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { createRef } from "react";

import ModalCartItem from "./ModalCartItem";
import { cartSelector } from "../redux/cart/selectors";
import { openModal } from "../redux/cart/slice";
import { calcTotalCount } from "../utils/calcTotalCount";
import { getCookie } from "../utils/getCookie";
import { filterSelector } from "../redux/filter/selectors";

const mapStateToProps = (state) => ({
  items: cartSelector(state).items,
  opened: cartSelector(state).opened,
  totalPrice: cartSelector(state).totalPrice,
  currencies: filterSelector(state).currencies,
});

const mapDispatchToProps = (dispatch) => ({
  openModal: bindActionCreators(openModal, dispatch),
});

class ModalCart extends Component {
  ref = createRef();
  state = {
    totalCount: 0,
  };

  componentDidMount() {
    const totalCount = calcTotalCount(this.props.items);
    this.setState({ totalCount });
    document.addEventListener("click", this.handleOutsideClick, false);
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick, false);
  }

  handleCloseModal = () => {
    this.props.openModal(false);
    document.body.style.overflow = "scroll";
  };

  handleOutsideClick = ({ target }) => {
    if (!this.ref.current.contains(target)) {
      this.props.openModal(false);
      document.body.style.overflow = "scroll";
    }
  };

  get template() {
    return (
      <div className="modal">
        <div className="modal__content" ref={this.ref}>
          <div className="modal__header">
            <p>My bag</p>
            <p>
              ,{this.state.totalCount} item
              {this.state.totalCount > 1 && "s"}
            </p>
          </div>
          <div className="modal__products">
            {this.props.items.map((item, index) => (
              <ModalCartItem key={`${item.id}_${index}`} item={item} />
            ))}
          </div>

          <div className="modal__content-info">
            <p>Total</p>
            <p>
              {this.props.currencies.map((item) => {
                if (item.label === getCookie("activeCurrency")) {
                  return item.symbol;
                }
              })}
              {this.props.totalPrice}
            </p>
          </div>
          <div className="modal__content-bottom">
            <Link to="/cart">
              <div
                onClick={() => this.handleCloseModal()}
                className="button button--modal button--modal--view"
              >
                VIEW BAG
              </div>
            </Link>
            {/* make constants */}
            <div className="button button--modal button--modal--check">
              CHECK OUT
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this.template;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalCart);
