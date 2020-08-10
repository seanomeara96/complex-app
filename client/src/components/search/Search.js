import React from "react";
import ReactDOM from "react-dom";
import api from "../../axios/config";
import DOMPurify from "dompurify";

class Search extends React.Component {
  state = {
    focused: false,
    isLoading: false,
    resultsExist: false,
    searchTerm: "",
    previousSearchTerm: "",
    searchResults: undefined,
  };

  constructor(props) {
    super(props);
    this.typingWaitTimer = null;
    this.inputField = document.querySelector("#live-search-field");
  }

  keyPressHandler = (e) => {
    this.setState({ searchTerm: e.target.value });
    if (this.state.searchTerm === "") {
      clearTimeout(this.typingWaitTimer);
      this.hideLoaderIcon();
      this.hideResultsArea();
    }
    if (
      this.state.searchTerm !== "" &&
      this.state.searchTerm !== this.state.previousSearchTerm
    ) {
      clearTimeout(this.typingWaitTimer);
      this.showLoaderIcon();
      this.hideResultsArea();
      this.typingWaitTimer = setTimeout(() => {
        this.showLoaderIcon();
        this.sendRequest();
      }, 750);
    }

    this.setState({ previousSearchTerm: this.state.searchTerm });
  };
  focusField() {
    if (this.props.open === true) {
      this.setState({ focused: true });
      document.querySelector("#live-search-field").focus();
    }
  }
  hideLoaderIcon() {
    this.setState({ isLoading: false });
  }
  showLoaderIcon() {
    this.setState({ isLoading: true });
  }
  showResultsArea() {
    this.setState({ resultsExist: true });
  }
  hideResultsArea() {
    this.setState({ resultsExist: false });
  }
  renderSearchResults = () => {
    const { searchResults } = this.state;

    if (typeof searchResults === "object") {
      //display

      return (
        <div className="list-group shadow-sm">
          <div className="list-group-item active">
            <strong>Search Results</strong> (
            {searchResults.length > 1
              ? `${searchResults.length} items found`
              : "1 item found"}
            )
          </div>
          {searchResults.map((post, index) => {
            let postID = DOMPurify.sanitize(post._id);
            let postAvatar = DOMPurify.sanitize(post.author.avatar);
            let postTitle = DOMPurify.sanitize(post.title);
            let postAuthor = DOMPurify.sanitize(post.author.username);
            let postDate = new Date(DOMPurify.sanitize(post.createdDate));
            return (
              <a
                key={index}
                href={`/post/${postID}`}
                className="list-group-item list-group-item-action"
              >
                <img className="avatar-tiny" src={postAvatar} alt={postTitle} />{" "}
                <strong>{postTitle}</strong>{" "}
                <span className="text-muted small">
                  by {postAuthor} on {postDate.getMonth() + 1}/
                  {postDate.getDate()}/{postDate.getFullYear()}
                </span>
              </a>
            );
          })}
        </div>
      );
    } else {
      //no results
      return (
        <p className="alert alert-danger text-center shadow-sm">
          Sorry, we could not find any results for that search.
        </p>
      );
    }
  };
  sendRequest() {
    api
      .post("/search", {
        _csrf: "vlah" /**this._csrf */,
        searchTerm: this.state.searchTerm,
      })
      .then((response) => {
        this.hideLoaderIcon();
        this.showResultsArea();
        let resultsArray = response.data.map((item) => item);
        this.renderSearchResults(response.data);
        this.setState({ searchResults: response.data });
      })
      .catch((err) => {
        console.warn(err);
      });
  }
  renderField() {
    return (
      <input
        name="search"
        type="text"
        id="live-search-field"
        className="live-search-field"
        placeholder="What are you interested in?"
        onKeyUp={this.keyPressHandler}
      />
    );
  }
  render() {
    if (this.state.focused === false) {
      setTimeout(() => {
        this.focusField();
      }, 50);
    }
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
            {this.renderField()}
            <span
              className="close-live-search"
              onClick={this.props.toggleSearchModal}
            >
              <i className="fas fa-times-circle"></i>
            </span>
          </div>
        </div>

        <div className="search-overlay-bottom">
          <div className="container container--narrow py-3">
            <div
              className={`circle-loader ${
                this.state.isLoading ? "circle-loader--visible" : ""
              }`}
            ></div>
            <div
              className={`live-search-results ${
                this.state.resultsExist ? "live-search-results--visible" : ""
              }`}
            >
              {this.state.resultsExist ? this.renderSearchResults() : ""}
            </div>
          </div>
        </div>
      </div>,
      document.querySelector("#search")
    );
  }
}

export default Search;
