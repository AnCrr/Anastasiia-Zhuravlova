import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import { findCorrectPrice } from "../utils/findCorrectPrice";
import { filterSelector } from "../redux/filter/selectors";
// import { showAttributes } from "../utils/showAttributes";
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
    activeIdx: 0,
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

  handleClickLeftArrow = () => {
    const newIdx = this.state.activeIdx === 0 ? 0 : this.state.activeIdx - 1;
    this.setState({ activeIdx: newIdx });
  };
  handleClickRightArrow = () => {
    const newIdx =
      this.state.activeIdx === this.state.gallery.length - 1
        ? this.state.activeIdx
        : this.state.activeIdx + 1;
    this.setState({ activeIdx: newIdx });
  };

  render() {
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
                <div className="cart-item__actions--vectors">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1"
                      height="17"
                      viewBox="0 0 1 17"
                      fill="none"
                    >
                      <path
                        d="M0.5 1V16"
                        stroke="#1D1F22"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 17 1"
                      fill="none"
                    >
                      <path
                        d="M1 0.5H16"
                        stroke="#1D1F22"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </button>
              <span>{this.state.customCount}</span>
              <button
                disabled={this.state.customCount === 1}
                onClick={this.handleMinusItem}
              >
                <div className="cart-item__actions--vectors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="1"
                    viewBox="0 0 17 1"
                    fill="none"
                  >
                    <path
                      d="M1 0.5H16"
                      stroke="#1D1F22"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </div>
            <div className="cart-item__image">
              <img
                src={this.state.gallery[this.state.activeIdx]}
                alt="product"
              />
              <div
                className="cart-item__image--arrow--left"
                onClick={() => this.handleClickLeftArrow()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                >
                  <path
                    d="M7.25 1.06857L1.625 6.6876L7.25 12.3066"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                className="cart-item__image--arrow--right"
                onClick={() => this.handleClickRightArrow()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                >
                  <path
                    d="M0.75 1.06808L6.375 6.68711L0.75 12.3062"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="border"></div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
