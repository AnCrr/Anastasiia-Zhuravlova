import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { withParams } from "../hooks/withParams";
import Categories from "../Categories";
import SelectCurrency from "../SelectCurrency";
import { openModal } from "../../redux/cart/slice";
import { cartSelector } from "../../redux/cart/selectors";
import { setCartToLs } from "../../utils/cart";
import { calcTotalCount } from "../../utils/cart";
import { filterSelector } from "../../redux/filter/selectors";
import { setCurrencies, setActiveCurrency } from "../../redux/filter/slice";
import { getCookie, setCookie } from "../../utils/cookies";
import ModalCart from "../ModalCart";
import { LogoIcon } from "./svg/LogoIcon";
import { CartIcon } from "./svg/CartIcon";

const mapStateToProps = (state) => ({
  isModalOpened: cartSelector(state).isModalOpened,
  cartItems: cartSelector(state).items,
  activeCategory: filterSelector(state).category,
  activeCurrency: filterSelector(state).activeCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  openModal: bindActionCreators(openModal, dispatch),
  setCurrencies: bindActionCreators(setCurrencies, dispatch),
  setActiveCurrency: bindActionCreators(setActiveCurrency, dispatch),
});

class Header extends Component {
  static propTypes = {
    activeCategory: PropTypes.string,
    activeCurrency: PropTypes.string,
    cartItems: PropTypes.arrayOf(PropTypes.object),
    isModalOpened: PropTypes.bool,
    location: PropTypes.object,
    params: PropTypes.object,
    openModal: PropTypes.func,
    setActiveCurrency: PropTypes.func,
    setCurrencies: PropTypes.func,
  };

  static defaultProps = {
    activeCategory: "all",
    activeCurrency: "USD",
    cartItems: [],
    isModalOpened: false,
    location: {},
    params: {},
  };

  state = {
    totalCount: 0,
  };

  componentDidMount() {
    const { cartItems, activeCurrency, setActiveCurrency } = this.props;
    setCartToLs(cartItems);
    this.calcTotalCount();

    if (!activeCurrency) {
      setCookie("activeCurrency", "USD");
      setActiveCurrency(getCookie("activeCurrency"));
    }
  }

  componentDidUpdate(prevState) {
    const { cartItems } = this.props;
    setCartToLs(cartItems);
    if (prevState.cartItems !== cartItems) {
      this.calcTotalCount();
    }
  }

  calcTotalCount() {
    const { cartItems } = this.props;
    const totalCount = calcTotalCount(cartItems);
    this.setState({ totalCount });
  }

  handleOpenModal = (event) => {
    const { openModal, isModalOpened } = this.props;
    event.stopPropagation(); // из-за этого не закрывается поп-ап

    openModal(!isModalOpened);
    this.changeBodyStyle(isModalOpened);
  };

  changeBodyStyle(isModalOpened) {
    if (!isModalOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }

  render() {
    const activeCategory = this.props.params.category;
    const { location, cartItems, isModalOpened } = this.props;
    const { totalCount } = this.state;
    return (
      <div className="header">
        <div className="container">
          <Categories location={activeCategory} />
          <Link to="/category/all">
            <div className="header__logo">
              <LogoIcon />
            </div>
          </Link>
          <div
            ref={(node) => {
              this.node = node;
            }}
            className="header__cart"
          >
            <div className="header__cart-actions">
              <div className="button button--currency">
                <div className="--spacer-xl"></div>
                <div className="--spacer-xl"></div>
                <SelectCurrency />
              </div>
              <button
                disabled={
                  location.pathname === "/cart" || cartItems.length === 0
                }
                onClick={this.handleOpenModal}
                className="button button--cart"
              >
                <CartIcon />
                {totalCount > 0 && (
                  <div className="header__total-count">
                    <span>{totalCount}</span>
                  </div>
                )}
              </button>
            </div>
          </div>
          {isModalOpened && <ModalCart />}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withParams(Header));
