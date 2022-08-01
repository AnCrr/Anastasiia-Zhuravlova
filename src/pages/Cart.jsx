import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { cartSelector } from "../redux/cart/selectors";
import { filterSelector } from "../redux/filter/selectors";
import CartItem from "../components/CartItem";
import { calcTotalCount } from "../utils/calcTotalCount";
import { getCookie } from "../utils/getCookie";

const mapStateToProps = (state) => ({
  items: cartSelector(state).items,
  totalPrice: cartSelector(state).totalPrice,
  currencies: filterSelector(state).currencies,
});

// const mapDispatchToProps = (dispatch) => ({
//   setProducts: bindActionCreators(setProducts, dispatch),
// });

class Cart extends Component {
  state = {
    totalCount: 0,
  };
  componentDidMount() {
    const totalCount = calcTotalCount(this.props.items);
    this.setState({ totalCount });
  }

  render() {
    return (
      <div className="cart">
        <div className="cart__title">
          <h1>Cart</h1>
        </div>
        <div className="cart__content">
          {this.props.items.map((cartItem, index) => (
            <CartItem key={index} item={cartItem} />
          ))}
        </div>
        <div className="cart__footer">
          <div className="cart__info">
            <p>
              Tax 21%: <strong>{(this.props.totalPrice * 21) / 100}</strong>
            </p>
            <p>
              Quantity: <strong>{this.state.totalCount}</strong>
            </p>
            <p>
              Total:
              <strong>
                {this.props.currencies.map((item) => {
                  if (item.label === getCookie("activeCurrency")) {
                    return item.symbol;
                  }
                })}
                {this.props.totalPrice}
              </strong>
            </p>
          </div>
          <div className="cart__button">
            <button>Order</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {})(Cart);
