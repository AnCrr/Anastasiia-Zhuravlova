import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { fetchCurrencies } from "../graphQL/api";
import { filterSelector } from "../redux/filter/selectors";
import { setCurrencies } from "../redux/filter/slice";
import { setCookie } from "../utils/setCookie";
import { getCookie } from "../utils/getCookie";

const mapStateToProps = (state) => ({
  activeCurrency: filterSelector(state).activeCurrency,
  currencies: filterSelector(state).currencies,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrencies: bindActionCreators(setCurrencies, dispatch),
});

class Select extends Component {
  ref = createRef();
  state = {
    // currencies: [],
    opened: false,
  };
  handleOpenPopup = () => {
    this.setState({ opened: !this.state.opened });
  };

  handleSelectCurrency = (currency) => {
    setCookie("activeCurrency", currency.label);
    // setCookie('activeCurrency')
    this.setState({ opened: false });
    // console.log(this.state.activeIdx);
    window.location.reload();
  };

  handleClickOutside = (event) => {
    const _event = event;
    if (this.ref.current && !_event.path.includes(this.ref.current)) {
      this.setState({ opened: false });
    }
  };

  getCurrencies = async () => {
    const { currencies } = await fetchCurrencies();

    this.props.setCurrencies({ currencies });
  };

  componentDidMount() {
    this.getCurrencies();
    document.body.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    return () => {
      document.body.removeEventListener("click", this.handleClickOutside);
    }; //do I need return?
  }

  findCurrency() {
    const { currencies, activeCurrency } = this.props;
    const { symbol } =
      currencies.find(({ label }) => label === activeCurrency) || {};
    return symbol;
  }

  render() {
    return (
      <div ref={this.ref} className="select">
        <div onClick={() => this.handleOpenPopup()} className="select__label">
          <span>{this.findCurrency()}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="4"
            viewBox="0 0 8 4"
            fill="none"
          >
            <path
              d="M1 3.5L4 0.5L7 3.5"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {this.state.opened && (
          <div className="select__popup">
            <ul>
              {this.props.currencies.map((currency, index) => (
                <li
                  className={
                    this.props.activeCurrency === currency.label ? "active" : ""
                  }
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

// export default Select;
export default connect(mapStateToProps, mapDispatchToProps)(Select);
