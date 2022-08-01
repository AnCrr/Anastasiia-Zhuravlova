import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";

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
  }
  componentDidUpdate() {
    // this.setState({ items: this.props.items });
    // console.log(this.state);
  }
  // componentDidUpdate(prevProps) {
  //   if (this.props.category && this.props.category !== prevProps.category) {
  //     this.fetchData(this.props.category);
  //   }
  // }

  handleCloseModal() {
    this.props.openModal(false);
  } // потом сделать handleClickOutSide и убрать закрытие модалки здесь

  get template() {
    return (
      <div className="modal">
        <div className="modal__content">
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
