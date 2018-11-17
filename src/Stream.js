import React, { Component } from 'react';
import './App.css';

/*Class that renders a stream div with the url, title,
  thumbnail, display name, and viewers.*/
class Stream extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverOpacity: "",
      hoverFilter: "",
    };

    this.handleOnMouseEnter_hoverTitle = this.handleOnMouseEnter_hoverTitle.bind(this);
    this.handleOnMouseLeave_hoverTitle = this.handleOnMouseLeave_hoverTitle.bind(this);
  }

  /*Renders a div with the url, title,
    thumbnail, display name, and viewers.*/
  render() {
    return (
      <a href = { this.props.url } target = "_blank">
        <div className="divToRemove" onMouseEnter={this.handleOnMouseEnter_hoverTitle} onMouseLeave={this.handleOnMouseLeave_hoverTitle}>
          <img src = { this.props.thumbnail }></img>
          <h1>{ this.props.displayName }</h1>
          <p>{ this.props.title }</p>
          <p>&nbsp;- { this.props.viewers } viewers</p>
          <div className="streamHoverParent" style={{"opacity": this.state.hoverOpacity, "filter": this.state.hoverFilter}}>
            <div className="streamHoverChild">{ this.props.title }</div>
          </div>
        </div>
      </a>
    );
  }

  /*When a stream div is hovered over display
    a smaller verrsion of the title of the stream
    after 750ms.*/
  handleOnMouseEnter_hoverTitle() {
    this.timerID = setTimeout(function() {
      this.setState({hoverOpacity: ".85"});
      this.setState({hoverFilter: "none"});
    }.bind(this), 750);
  }

  /*When a stream div is no longer being hovered over
    clear the timeout and hide the title.*/
  handleOnMouseLeave_hoverTitle() {
    clearTimeout(this.timerID);
    this.setState({hoverOpacity: "0"});
    this.setState({hoverFilter: "alpha(opacity = 0)"});
  }
}

export default Stream;
