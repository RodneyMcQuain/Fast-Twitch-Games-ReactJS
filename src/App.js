import React, { Component } from 'react';
import {default as Header} from './Header';
import {default as Streams} from './Streams';
import './App.css';

//Class for the highest level component.
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGame: ""
    };

    this.setSelectedGame = this.setSelectedGame.bind(this);
  }

  //Sets the state for the selected game from the games dropdown.
  setSelectedGame(gameName) {
    this.setState({selectedGame: gameName});
  }

  //Render the Header and Streams sections.
  render() {
    return (
      <div>
        <Header selectedGame={this.state.selectedGame} setSelectedGame={this.setSelectedGame}/>
        <Streams selectedGame={this.state.selectedGame} />
      </div>
    );
  }
}

export default App;
