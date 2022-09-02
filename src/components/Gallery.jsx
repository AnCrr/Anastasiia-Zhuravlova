import React, { Component } from "react";
import PropTypes from "prop-types";

import { OUT_OF_STOCK } from "../constants";

class Gallery extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    images: [],
  };

  state = {
    activeImgIdx: 0,
  };

  handleSetImage(activeImgIdx) {
    this.setState({ activeImgIdx });
  }

  render() {
    const { images, inStock } = this.props;
    const { activeImgIdx } = this.state;
    return (
      <div className={`gallery ${!inStock ? "unactive" : ""}`}>
        <div className="gallery__slider">
          {images.map((image, index) => (
            <div key={index} className="gallery__item">
              <img
                onClick={() => this.handleSetImage(index)}
                src={image}
                alt="pic"
              />
            </div>
          ))}
        </div>
        <div className="gallery__main">
          {!inStock && <p>{OUT_OF_STOCK}</p>}
          <img src={images[activeImgIdx]} alt="activeImage" />
        </div>
      </div>
    );
  }
}

export default Gallery;
