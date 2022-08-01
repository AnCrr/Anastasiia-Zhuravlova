import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { findCorrectPrice } from "../utils/findCorrectPrice";
import { filterSelector } from "../redux/filter/selectors";
import { showAttributes } from "../utils/showAttributes";
import { addItem, minusItem } from "../redux/cart/slice";

const mapStateToProps = (state) => ({
  currency: filterSelector(state).activeCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: bindActionCreators(addItem, dispatch),
  minusItem: bindActionCreators(minusItem, dispatch),
});

class CartItem extends Component {
  state = {
    ...this.props.item,
    customCount: this.props.item.count,
  };
  handleSetAttrs = (event) => {
    const { attrs } = this.state;
    const resultAttrs = attrs.map((attr) => {
      if (attr.id === event.target.id) {
        return { ...attr, value: event.target.dataset.value };
      }
      return attr;
    });
    // console.log(resultAttrs);
    this.setState({ attrs: resultAttrs });
  };
  handleAddItem = () => {
    this.props.addItem(this.state);
    this.setState({ customCount: ++this.state.customCount });
  };

  handleMinusItem = () => {
    this.props.minusItem({ id: this.state.id, attrs: this.state.attrs });
    this.setState({ customCount: --this.state.customCount });
  };

  render() {
    // console.log(showAttributes(this.state.attributes, this.state.attrs));
    return (
      <div className="cart-item">
        <div className="border"></div>
        <div className="cart-item__content">
          <div className="cart-item__info">
            <div className="cart-item__title">
              <h1 className="cart-item__title--brand">{this.state.brand}</h1>
              <h1 className="cart-item__title--name">{this.state.name}</h1>
            </div>
            <div className="cart-item__price">
              {this.state.prices &&
                this.state.prices.map((price, index) => {
                  return (
                    price.currency.label === this.props.currency && (
                      <p key={index}>
                        {price.currency.symbol}
                        {price.amount}
                      </p>
                    )
                  );
                })}
              {/* why does findCorrectPrice not work here? */}
            </div>
            <div className="product__info--attributes">
              {this.state.attributes.map((attribute, index) => {
                const current = this.state.attrs.find(
                  (attr) => attr.id === attribute.id
                );
                const items = attribute.values.map((value, index) => {
                  if (attribute.name === "Color") {
                    return (
                      <div
                        onClick={(event) => this.handleSetAttrs(event)}
                        key={index}
                        className={`product__info--attributes__color-wrapper ${
                          value === current.value ? "active" : ""
                        }`}
                      >
                        <div
                          id={attribute.id}
                          data-value={value}
                          style={{
                            backgroundColor: value,
                          }}
                          className="product__info--attributes__color-item"
                        ></div>
                      </div>
                    );
                  }
                  return (
                    <div key={index}>
                      <div
                        onClick={(event) => this.handleSetAttrs(event)}
                        className="product__info--attributes__item"
                      >
                        <p
                          id={attribute.id}
                          data-value={value}
                          className={value === current.value ? "active" : ""}
                        >
                          {value}
                        </p>
                      </div>
                    </div>
                  );
                });

                return (
                  <div key={index}>
                    <div className="product__info--attributes--name">
                      {attribute.name.toUpperCase()}:
                    </div>
                    <div className="product__info--attributes__items">
                      {items}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="cart-item__sidebar">
            <div className="cart-item__actions">
              <button onClick={this.handleAddItem}>
                <span>+</span>
              </button>
              <span>{this.state.customCount}</span>
              <button
                disabled={this.state.customCount === 1}
                onClick={this.handleMinusItem}
              >
                <span>-</span>
              </button>
            </div>
            <div className="cart-item__image">
              <img src={this.state.gallery[0]} alt="product" />
            </div>
          </div>
        </div>

        <div className="border"></div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
