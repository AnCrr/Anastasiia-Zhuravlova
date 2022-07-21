import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

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
  state = {
    totalCount: 0,
  };

  componentDidMount() {
    const totalCount = calcTotalCount(this.props.items);
    this.setState({ totalCount });
    // console.log(getCookie("activeCurrency"));
  }
  componentDidUpdate() {
    // console.log("updated", this.props);
  }

  get template() {
    return (
      <div className="modal">
        <div className="modal__content">
          <div className="modal__header">
            <p>My bag</p>
            <p>
              ,{this.state.totalCount} item
              {this.props.items.length > 1 && "s"}
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
            <div className="button button--modal button--modal--view">
              VIEW BAG
            </div>
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
