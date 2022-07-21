import React, { Component } from "react";
import { withParams } from "../utils/adaptHook";
import { connect } from "react-redux";
// import { useParams, Link, useNavigate } from "react-router-dom";

import { fetchProductById } from "../graphQL/api";
import { filterSelector } from "../redux/filter/selectors";

const mapStateToProps = (state) => ({
  currency: filterSelector(state).activeCurrency,
});

// const mapDispatchToProps = (dispatch) => ({
//   addItem: bindActionCreators(addItem, dispatch),
//   minusItem: bindActionCreators(minusItem, dispatch),
// });

class Product extends Component {
  state = { item: {} };
  componentDidMount() {
    // const { id } = this.props.params
    const id = "jacket-canada-goosee";
    this.getProduct(id);
  }
  async getProduct(id) {
    const { product } = await fetchProductById(id);
    this.setState({ item: product });
    // console.log(result);
  }
  render() {
    // console.log(this.state.item?.product.name);
    const product = this.state.item;
    console.log(product);
    const description = this.state.item.description;
    return (
      <div className="product-block-wrapper">
        <div className="product-block">
          <img
            className="product-block__image"
            src={product.gallery && product.gallery[0]}
            alt="Cake"
          />
          <h2 className="product-block__title">{this.state.item.name}</h2>
          <h4 className="product-block__price">
            Стоимость:{" "}
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
          </h4>
        </div>
        <div className="product-block__info">{description}</div>
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

export default connect(mapStateToProps, {})(Product);
