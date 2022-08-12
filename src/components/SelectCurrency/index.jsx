import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import PropTypes from "prop-types";

import { fetchCurrencies } from "../../graphQL/api";
import { filterSelector } from "../../redux/filter/selectors";
import { cartSelector } from "../../redux/cart/selectors";
import { setCurrencies } from "../../redux/filter/slice";
import { setCookie } from "../../utils/cookies";
import { ArrowIcon } from "./svg/ArrowIcon";

const mapStateToProps = (state) => ({
  activeCurrency: filterSelector(state).activeCurrency,
  currencies: filterSelector(state).currencies,
  isModalOpened: cartSelector(state).isModalOpened,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrencies: bindActionCreators(setCurrencies, dispatch),
});

class SelectCurrency extends Component {
  static propTypes = {
    activeCurrency: PropTypes.string,
    currencies: PropTypes.arrayOf(PropTypes.object),
    isModalOpened: PropTypes.bool,
    setCurrencies: PropTypes.func,
  };

  static defaultProps = {
    activeCurrency: "USD",
    currencies: [],
    isModalOpened: false,
  };

  ref = createRef();

  state = {
    isPopupOpened: false,
  };

  componentDidMount() {
    this.getCurrencies();
    document.body.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.handleClickOutside);
  }

  handleOpenPopup = () => {
    const isPopupOpened = this.state.isPopupOpened;
    this.setState({ isPopupOpened: !isPopupOpened });
  };

  handleSelectCurrency = (currency) => {
    setCookie("activeCurrency", currency.label);
    this.setState({ isPopupOpened: false });
    window.location.reload();
  };

  handleClickOutside = (event) => {
    if (!event.path.includes(this.ref.current)) {
      this.setState({ isPopupOpened: false });
    }
  };

  getCurrencies = async () => {
    const { setCurrencies } = this.props;
    const { currencies } = await fetchCurrencies();
    setCurrencies({ currencies });
  };

  findCurrency() {
    const { currencies, activeCurrency } = this.props;
    const { symbol } =
      currencies.find(({ label }) => label === activeCurrency) || {};
    return symbol;
  }

  render() {
    const { isPopupOpened } = this.state;
    const { currencies, activeCurrency, isModalOpened } = this.props;
    return (
      <div ref={this.ref} className="select">
        <button
          disabled={isModalOpened}
          onClick={() => this.handleOpenPopup()}
          className="select__label"
        >
          <span>{this.findCurrency()}</span>
          <ArrowIcon className={isPopupOpened ? "active" : ""} />
        </button>
        {isPopupOpened && (
          <div className="select__popup">
            <ul>
              {currencies.map((currency, index) => (
                <li
                  className={activeCurrency === currency.label ? "active" : ""}
                  onClick={() => this.handleSelectCurrency(currency)}
                  key={index}
                  value={currency.symbol}
                >
                  {currency.symbol} {currency.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCurrency);
