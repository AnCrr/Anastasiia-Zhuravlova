import React, { Component } from "react";

class Gallery extends Component {
  state = {
    activeIdx: 0,
  };

  handleSetImage(activeIdx) {
    this.setState({ activeIdx });
  }

  render() {
    return (
      <div>
        <div className="active-image">
          <img
            src={this.props.images && this.props.images[this.state.activeIdx]}
            alt="activeImage"
          />
        </div>
        <div className="images-gallery">
          {this.props.images &&
            this.props.images.map((image, index) => (
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
