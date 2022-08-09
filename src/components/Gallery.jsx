import React, { Component } from "react";
import PropTypes from "prop-types";

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
    const { images } = this.props;
    const { activeImgIdx } = this.state;
    return (
      <div>
        <div className="active-image">
          <img src={images[activeImgIdx]} alt="activeImage" />
        </div>
        <div className="images-gallery">
          {images.map((image, index) => (
            <img
              onClick={() => this.handleSetImage(index)}
              key={index}
              src={image}
              alt="pic"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Gallery;
