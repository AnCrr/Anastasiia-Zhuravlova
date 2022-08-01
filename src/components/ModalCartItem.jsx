import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { filterSelector } from "../redux/filter/selectors";
import { addItem, minusItem } from "../redux/cart/slice";
import { cartSelector } from "../redux/cart/selectors";

const mapStateToProps = (state) => ({
  currency: filterSelector(state).activeCurrency,
  items: cartSelector(state).items,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: bindActionCreators(addItem, dispatch),
  minusItem: bindActionCreators(minusItem, dispatch),
});

class ModalCartItem extends Component {
  state = {
    ...this.props.item,
    customCount: this.props.item.count,
  };

  componentDidMount() {
    // console.log(this.props);
  }

  defineBackgroundColor(item) {
    if (item.value.startsWith("#")) {
      return item.value;
    }
  }

  checkIfColor(item) {
    return item.value.startsWith("#") ? true : false;
  }

  // getFormattedAttrs = () => {
  //   const { attributes, attrs } = this.props;

  //   return attributes.map((attribute) => {
  //     const current = attrs.find((attr) => attr.id === attribute.id);

  //     return attribute.values.map((value, index) => {
  //       <div key={index} className={value === current.value ? "active" : ""}>
  //         {" "}
  //       </div>;
  //     });
  //   });

  //   // return {
  //   //   ...attribute,
  //   //   items: attribute.values.map((value) => ({
  //   //     ...item,
  //   //     isActive: item.displayValue === current.value,
  //   //   })),
  //   // };
  // };

  handleAddItem = () => {
    this.props.addItem(this.state);
    this.setState({ customCount: ++this.state.customCount });
  };

  handleMinusItem = () => {
    this.props.minusItem({ id: this.state.id, attrs: this.state.attrs });
    this.setState({ customCount: --this.state.customCount });
  };
  // handleMinusItem = () => {
  //   this.props.minusItem(this.state.id);
  // };

  render() {
    // const findItem = this.props.items.find((item) => item.id === this.state.id);
    // console.log(this.state.attrs);
    return (
      <div className="modal__cart-item">
        <div className="modal__cart-item__info">
          <p className="modal__cart-item__title">{this.state.brand}</p>
          <p className="modal__cart-item__title">{this.state.name}</p>
          <span className="modal__cart-item__price">
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
          </span>

          <div className="attributes">
            {this.state.attributes.map((attribute, index) => {
              const current = this.state.attrs.find(
                (attr) => attr.id === attribute.id
              );
              // console.log(current);
              console.log(attribute);
              const items = attribute.values?.map((value, index) => {
                if (attribute.name === "Color") {
                  return (
                    <div
                      key={index}
                      className={`attributes__color-wrapper ${
                        value === current.value ? "active" : ""
                      }`}
                    >
                      <div
                        style={{
                          backgroundColor: value,
                        }}
                        className="attributes__color-item"
                      ></div>
                    </div>
                  );
                }
                return (
                  <div key={index}>
                    <div
                      className={`attributes__item ${
                        value === current.value ? "active" : ""
                      }`}
                    >
                      {value}
                    </div>
                  </div>
                );
              });

              return (
                <div key={index}>
                  <div className="attributes--name">{attribute.name}</div>
                  <div className="attributes__items">{items}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal__cart-item__actions">
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
        <div className="modal__cart-item__image">
          <img src={this.state.gallery[0]} alt="product" />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalCartItem);
