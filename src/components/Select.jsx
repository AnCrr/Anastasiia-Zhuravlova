import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { fetchCurrencies } from "../graphQL/api";
import { filterSelector } from "../redux/filter/selectors";
import { setCurrency } from "../redux/filter/slice";

const mapStateToProps = (state) => ({
  currency: filterSelector(state).currency,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrency: bindActionCreators(setCurrency, dispatch),
});

class Select extends Component {
  ref = createRef();
  state = {
    currencies: [],
    opened: false,
  };
  handleOpenPopup = () => {
    this.setState({ opened: !this.state.opened });
  };

  handleSelectCurrency = (currency) => {
    this.props.setCurrency(currency);

    this.setState({ opened: false });
  };

  handleClickOutside = (event) => {
    const _event = event;
    if (this.ref.current && !_event.path.includes(this.ref.current)) {
      this.setState({ opened: false });
    }
  };

  getCurrencies = async () => {
    const { currencies } = await fetchCurrencies();

    this.setState({ currencies });
  };

  componentDidMount() {
    this.getCurrencies();
    document.body.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    return () => {
      document.body.removeEventListener("click", this.handleClickOutside);
    };
  }

  render() {
    return (
      <div ref={this.ref} className="select">
        <div onClick={() => this.handleOpenPopup()} className="select__label">
          <span>{this.props.currency}</span>
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
              {this.state.currencies.map((currency, index) => (
                <li
                  onClick={() => this.handleSelectCurrency(currency.symbol)}
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
