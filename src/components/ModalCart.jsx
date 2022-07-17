import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import ModalCartItem from "./ModalCartItem";
import { cartSelector } from "../redux/cart/selectors";
import { openModal } from "../redux/cart/slice";

const mapStateToProps = (state) => ({
  items: cartSelector(state).items,
  opened: cartSelector(state).opened,
});

const mapDispatchToProps = (dispatch) => ({
  openModal: bindActionCreators(openModal, dispatch),
});

class ModalCart extends Component {
  state = {};

  componentDidMount() {
    // console.log("mounted", this.props);
  }
  componentDidUpdate() {
    // console.log("updated", this.props);
  }

  get template() {
    return (
      <div className="modal">
        <div className="modal__content">
          <div className="modal__header">
            <p>My bag, </p>
            <p>3 items</p>
          </div>
          {this.props.items.map((item) => (
            <ModalCartItem key={item.id} {...item} />
          ))}

          <div className="modal__content-info">
            <p>Total</p>
            <p>$200.00</p>
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
