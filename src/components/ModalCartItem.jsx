import React, { Component } from "react";
import { connect } from "react-redux";

import { filterSelector } from "../redux/filter/selectors";

const mapStateToProps = (state) => ({
  currency: filterSelector(state).currency,
});

//   const mapDispatchToProps = (dispatch) => ({
//     addItem: bindActionCreators(addItem, dispatch),
//   });

class ModalCartItem extends Component {
  state = {
    price: this.props.prices,
    activeIdx: 1,
  };

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div className="modal__cart-item">
        <div className="modal__cart-item__info">
          <p className="modal__cart-item__title">{this.props.brand}</p>
          <p className="modal__cart-item__title">{this.props.name}</p>
          <span className="modal__cart-item__price">
            {this.state.price &&
              this.state.price.map(
                (price, index) =>
                  price.currency.symbol === this.props.currency && (
                    <p key={index}>
                      {price.currency.symbol}
                      {price.amount}
                    </p>
                  )
              )}
          </span>
          {this.props.attributes.map((attr, index) => {
            return (
              <>
                <p className="attributes--name" key={index}>
                  {attr.name}:
                </p>
                <div className="attributes">
                  {attr.items.map((item, index) => (
                    <span
                      className={index === this.state.activeIdx ? "active" : ""}
                      key={index}
                    >
                      {item.displayValue}
                    </span>
                  ))}
                </div>
              </>
            );
          })}
          {/* make constants */}
        </div>
        <div className="modal__cart-item__actions">
          <button>+</button>
          <span>{this.props.count}</span>
          <button>-</button>
        </div>
        <div className="modal__cart-item__image">
          <img src={this.props.gallery[0]} alt="product" />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {})(ModalCartItem);
