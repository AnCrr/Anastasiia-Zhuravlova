import React, { Component } from "react";
import PropTypes from "prop-types";

class Attributes extends Component {
  static propTypes = {
    attributes: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeAttributes: PropTypes.arrayOf(PropTypes.object).isRequired,
    isProduct: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    attributes: [],
    activeAttributes: [],
    className: "",
  };

  renderAttributes = (attributes, activeAttributes) => {
    return attributes.map((attribute, index) => {
      const current =
        activeAttributes.find((attr) => {
          return attr.id === attribute.id;
        }) || {};
      const items = attribute.values.map((value, index) => {
        if (attribute.name === "Color") {
          return (
            <div
              onClick={this.handleSetAttrs}
              key={index}
              className={`attribute__color-item ${
                value === current.value ? "active" : ""
              }`}
            >
              <div
                data-name={attribute.id}
                data-value={value}
                style={{
                  backgroundColor: value,
                }}
                className={"attribute__color"}
              ></div>
            </div>
          );
        }
        return (
          <div onClick={this.handleSetAttrs} key={index}>
            <div
              data-name={attribute.id}
              data-value={value}
              className={`attribute__item ${
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
          <div className={`attribute__name`}>{attribute.name}:</div>
          <div className={`attribute__wrapper`}>{items}</div>
        </div>
      );
    });
  };

  handleSetAttrs = (event) => {
    const { isProduct, onSetAttrs } = this.props;
    if (!isProduct) return false;
    onSetAttrs(event);
  };

  render() {
    const { className, attributes, activeAttributes } = this.props;
    return (
      <div className={`attributes ${className}`}>
        {this.renderAttributes(attributes, activeAttributes)}
      </div>
    );
  }
}

export default Attributes;
