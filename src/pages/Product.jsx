import React, { Component } from "react";
import { withParams } from "../utils/adaptHook";
import { connect } from "react-redux";
import parse from "html-react-parser";
import { bindActionCreators } from "redux";

import { fetchProductById } from "../graphQL/api";
import { filterSelector } from "../redux/filter/selectors";
import { reduceAttrs } from "../utils/reduceAttrs";
import Gallery from "../components/Gallery";
import { addItem } from "../redux/cart/slice";

const mapStateToProps = (state) => ({
  currency: filterSelector(state).activeCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: bindActionCreators(addItem, dispatch),
});

class Product extends Component {
  state = { item: {}, attributes: [] };
  componentDidMount() {
    this.getProduct(this.props.params.id);
  }

  async getProduct(id) {
    const { product } = await fetchProductById(id);
    this.setState({
      item: { ...product, attributes: reduceAttrs(product.attributes) },
      attributes: reduceAttrs(product.attributes), // почему это работает правильно и не работает если здесь не передавать отдельно атрибуты, а при отрисовке доставать их из item???
      attrs: product.attributes.reduce((accum, attr) => {
        accum.push({ id: attr.id, value: attr.items[0].value });
        return accum;
      }, []),
    });
  }

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
    // const productInfo = this.state.item;
    const productInfo = { ...this.state.item, attrs: this.state.attrs };
    const productAttrs = this.state.attrs;
    const product = { productInfo, productAttrs };
    console.log(productInfo);
    this.props.addItem(productInfo);
    // console.log("added", product);
  };

  render() {
    // console.log(this.state.item);
    // const dataLength = Object.keys(this.state.item);
    // console.log(this.state.item.attributes);
    const description = this.state.item.description;
    return (
      <div className="product-wrapper">
        <div className="product">
          <Gallery images={this.state.item.gallery} />

          <div className="product__info">
            <div className="product__info--title">
              <h2 className="product__info--title--brand">
                {this.state.item.brand}
              </h2>
              <h2 className="product__info--title--name">
                {this.state.item.name}
              </h2>
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
            <div className="product__info--price">
              PRICE:{" "}
              {this.state.item.prices &&
                this.state.item.prices.map((price, index) => {
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
            <button
              onClick={() => this.handleAddItem()}
              className="product__info--button"
            >
              <p>ADD TO CART</p>
            </button>
            <div className="product__info--description">
              {description && parse(description)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const FullCake = () => {
//   const { id } = useParams();
//   const [cake, setCake] = useState<{
//     imageUrl: string;
//     title: string;
//     price: number;
//     description: string;
//   }>();
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchCake() {
//       try {
//         const { data } = await axios.get(
//           "https://62b1930ac7e53744afbc2567.mockapi.io/items/" + id
//         );
//         setCake(data);
//       } catch (error) {
//         alert("Ошибка при загрузке страницы");
//         navigate("/");
//       }
//     }
//     fetchCake();
//   }, [id]);

//   if (!cake) {
//     return <h2 className="fullCake-block__loading">Загрузка...</h2>;
//   }

//   return (
// <div className="fullCake-block-wrapper">
//   <div className="fullCake-block">
//     <img className="fullCake-block__image" src={cake.imageUrl} alt="Cake" />
//     <h2 className="fullCake-block__title">{cake.title}</h2>
//     <h4 className="fullCake-block__price">Стоимость: {cake.price} ₴</h4>
//   </div>
//   <div className="fullCake-block__info">
//     <p className="fullCake-block__description"> {cake.description}</p>
//     <Link to="/">
//       <button className="button button--outline button--add fullCake-block__btn">
//         <span>Назад</span>
//       </button>
//     </Link>
//   </div>
// </div>
//   );
// };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(Product));
