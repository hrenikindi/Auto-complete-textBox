import React, { Component, createRef } from "react";
import countryData from "./resources/countryData.json";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      suggestions: [],
      showSuggestions: false,
    };
    this.inputRef = createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleChange(event) {
    const query = event.target.value;
    this.setState({ query }, () => {
      if (query.length > 0) {
        const filteredSuggestions = countryData.filter((country) =>
          country.name.toLowerCase().includes(query.toLowerCase())
        );
        this.setState({
          suggestions: filteredSuggestions,
          showSuggestions: true,
        });
      } else {
        this.setState({
          suggestions: [],
          showSuggestions: false,
        });
      }
    });
  }

  handleKeyDown(event) {
    if (event.key === "Escape") {
      console.log("Escape");
      this.setState({ showSuggestions: false });
    }
  }

  handleClickOutside(event) {
    if (
      this.inputRef.current &&
      !this.inputRef.current.contains(event.target)
    ) {
      this.setState({ showSuggestions: false });
    }
  }

  render() {
    const { query, suggestions, showSuggestions } = this.state;

    return (
      <div>
        <h1>Search</h1>
        <input
          type="text"
          value={query}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          ref={this.inputRef}
        />
        <button onClick={() => this.setState({ showSuggestions: true })}>
          Search
        </button>
        {showSuggestions && suggestions.length > 0 && (
          <ul>
            {suggestions.map((country) => (
              <li key={country.code}>{country.name}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default SearchBox;
