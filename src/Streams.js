import React, { Component } from 'react';
import {default as Stream} from './Stream'
import API_KEY from './config'
import './App.css';

/*Class for the bottom portion of the app, which displays
  the streams, based on the selected game.*/
class Streams extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      streamsApiData: [],
      selectedGame: this.props.selectedGame
    };
  }

  /*Makes an API call when component mounts, delayed by 100ms to
    be sure the selectedGame is not the default, but instead the
    correct one from local storage.*/
  componentDidMount() {
    setTimeout(() => {this.apiCall()}, 100);
  }

  /*If current props and previous props of selected game don't match
    each other then set the state of selected game and make an API call
    to render streams for the new selecteed game.*/
  componentDidUpdate(prevProps) {
    if (this.props.selectedGame !== prevProps.selectedGame) {
      this.setState({selectedGame: this.props.selectedGame}, this.apiCall());
    }
  }

  //API call to the Twitch API, using the selected game.
  apiCall() {
    let request = new XMLHttpRequest();
    request = this.openRequest(request, this.props.selectedGame);
    request.setRequestHeader('Client-ID', API_KEY);
    request.send();

    request.onload = function () {
      let streamsApiData = JSON.parse(request.response);

      if (request.status >= 200 && request.status < 400) {
        this.setState({
          isLoaded: true,
          streamsApiData: streamsApiData.streams
        });
      }
    }.bind(this);
  }

  //Makes the game name into a valid url, then opens a request.
  openRequest(request, gameName) {
    let gameNameSplit = gameName.split(" ");
    let gameUrl = gameNameSplit.join("%20");

    request.open("GET", "https://api.twitch.tv/kraken/streams/?game=" + gameUrl, true);

    return request;
  }

  /*If the API call has not loaded return a div indicating that.
    If the length of API stream data is 0 create a div indicating that.
    If there is stream data render divs with the appropriate data.*/
  render() {
    const { isLoaded, streamsApiData } = this.state;

    if (!isLoaded) {
      return (
        <div id="preloader-overlay">
          <div id="preloader-spinner"></div>
        </div>
      );
    } else if (streamsApiData.length === 0) {
      return  this.createDivForNoStream();
    } else {
      let streams = [];
      for (var i = 0; i < streamsApiData.length; i++) {
        streams.push(this.renderStream(streamsApiData, i));
      }

      return <div>{ streams }</div>;
    }
  }

  //Div that's created when there are no streams returned from the API call.
  createDivForNoStream() {
    return (
      <div>
        <h1>Invalid game name or no one is streaming this game</h1>
      </div>
    );
  }

  //Creates a stream div based on API results.
  renderStream(data, i) {
    return (
      <Stream
        key = { i }
        thumbnail = { data[i].preview.small }
        title = { data[i].channel.status }
        displayName = { data[i].channel.display_name }
        viewers = { data[i].viewers }
        url = { data[i].channel.url }
      />
    );
  }
}

export default Streams;
