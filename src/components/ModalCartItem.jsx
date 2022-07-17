import React, { Component } from "react";

class ModalCartItem extends Component {
  componentDidUpdate() {
    console.log(this.props);
  }
  render() {
    return <div className="modal__cart-item">modalCartItem</div>;
  }
}

export default ModalCartItem;
