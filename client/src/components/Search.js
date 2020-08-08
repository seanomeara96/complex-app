import React from "react";
import ReactDOM from "react-dom";
class Search extends React.Component {
  state = { focused: false };

  focusField() {
    if (this.props.open === true && this.state.focused === false) {
      console.log("hey");
      this.setState({ focused: true });
      document.querySelector("#live-search-field").focus();
    }
  }

  render() {
    setTimeout(() => {
      this.focusField();
    }, 100);
    return ReactDOM.createPortal(
      <div
        className={`search-overlay ${
          this.props.open === true ? "search-overlay--visible" : ""
        }`}
      >
        <div className="search-overlay-top shadow-sm">
          <div className="container container--narrow">
            <label htmlFor="live-search-field" className="search-overlay-icon">
              <i className="fas fa-search"></i>
            </label>
            <input
              type="text"
              id="live-search-field"
              className="live-search-field"
              placeholder="What are you interested in?"
            />
            <span className="close-live-search">
              <i className="fas fa-times-circle"></i>
            </span>
          </div>
        </div>

        <div className="search-overlay-bottom">
          <div className="container container--narrow py-3">
            <div className="circle-loader"></div>
            <div className="live-search-results "></div>
          </div>
        </div>
      </div>,
      document.querySelector("#search")
    );
  }
}
export default Search;
