import React, { Component } from "react";
import { connect } from "react-redux";
import parse from "html-react-parser";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import { withParams } from "../utils/adaptHook";
import { fetchProductById } from "../graphQL/api";
import { filterSelector } from "../redux/filter/selectors";
import { reduceAttributes } from "../utils/reduceAttributes";
import Gallery from "../components/Gallery";
import { addProduct } from "../redux/cart/slice";
import Attributes from "../components/Attributes";
import { ADD_TO_CART, PRICE } from "../constants";

const mapStateToProps = (state) => ({
  currency: filterSelector(state).activeCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: bindActionCreators(addProduct, dispatch),
});

class Product extends Component {
  static propTypes = {
    currency: PropTypes.string,
    params: PropTypes.object,
    location: PropTypes.object,
    addProduct: PropTypes.func,
  };

  static defaultProps = {
    currency: "USD",
    params: {},
    location: {},
  };

  state = { item: {} };
  componentDidMount() {
    this.getProduct(this.props.params.id);
  }

  async getProduct(id) {
    const { product } = await fetchProductById(id);
    const activeAttributes = product.attributes.reduce((accum, attr) => {
      accum.push({ id: attr.id, value: attr.items[0].value });
      return accum;
    }, []);
    this.setState({
      item: {
        ...product,
        attributes: reduceAttributes(product.attributes),
        activeAttributes,
      },
    });
  }

  handleSetAttrs = (event) => {
    const { activeAttributes } = this.state.item;
    const resultAttrs = activeAttributes.map((attr) => {
      if (attr.id === event.target.dataset.name) {
        return { ...attr, value: event.target.dataset.value };
      }
      return attr;
    });

    this.setState({
      item: { ...this.state.item, activeAttributes: resultAttrs },
    });
  };

  handleAddProduct = () => {
    const { item } = this.state;
    const { addProduct } = this.props;
    const productInfo = { ...item, activeAttributes: item.activeAttributes };
    addProduct(productInfo);
  };

  render() {
    const {
      description,
      gallery,
      brand,
      name,
      prices,
      inStock,
      attributes,
      activeAttributes,
    } = this.state.item;
    return (
      <div className="product-wrapper">
        <div className="product">
          <Gallery images={gallery} />

          <div className="product__info">
            <div className="product__info--title">
              <h2 className="product__info--title--brand">{brand}</h2>
              <h2 className="product__info--title--name">{name}</h2>
            </div>

            <Attributes
              attributes={attributes}
              activeAttributes={activeAttributes}
              isProduct={true}
              onSetAttrs={this.handleSetAttrs}
            />
            <div className="product__info--price">
              {PRICE}:
              {prices &&
                prices.map((price, index) => {
                  return (
                    price.currency.label === this.props.currency && (
                      <p key={index}>
                        {price.currency.symbol}
                        {price.amount}
                      </p>
                    )
                  );
                })}{" "}
            </div>
            {inStock && (
              <button
                onClick={() => this.handleAddProduct()}
                className="product__info--button"
              >
                <p>{ADD_TO_CART}</p>
              </button>
            )}
            <div className="product__info--description">
              {description && parse(description)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(Product));
