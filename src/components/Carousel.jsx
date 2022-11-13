import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };
  render() {
    const { images } = this.props;
    const { active } = this.state;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((src, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <img
              src={src}
              alt="animal"
              key={src}
              data-index={index}
              className={index === active ? "active" : ""}
              onClick={(e) =>
                this.setState({ active: +e.target.dataset.index })
              }
            />
          ))}
        </div>
      </div>
    );
  }
}
export default Carousel;
