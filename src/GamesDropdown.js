import React, { Component } from 'react';
import './App.css';

/*Stores games in a dropdown box and handles when
  a new game is selected.*/
class GamesDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {gameValue: this.props.gameValue};

    this.handleOnChange_GamesDropdown = this.handleOnChange_GamesDropdown.bind(this);
  }

  /*If the previous prop value is not the same as the new
    one update the state of gameValue to the New prop.*/
  componentDidUpdate(prevProps) {
    if (this.props.gameValue !== prevProps.gameValue)
      this.setState({gameValue: this.props.gameValue});
  }

  /*OnChange event for when a new game is selected.
    The game selected is then passed up to the parent.*/
  handleOnChange_GamesDropdown(e) {
    let gameValue = e.target.value;

    this.setState({gameValue: gameValue});
    this.props.setSelectedGame(gameValue);
  }

  /*If there are no games then an appropriate message is returned
    as an option of the dropdown. If there are games then populate
    the dropdown with the games.*/
  render() {
    let propsGames = this.props.games;

    if (propsGames.length === 0) {
      return (
        <select className="combo-box">
          <option>No Games to Show</option>
        </select>
      );
    } else {
      let games = [];
      for (let i = 0; i < propsGames.length; i++)
        games.push(<option value={propsGames[i]}>{ propsGames[i] }</option>);

      return (
        <select value={this.state.gameValue} onChange={this.handleOnChange_GamesDropdown} className="combo-box">
          { games }
        </select>
      );
    }
  }
}

export default GamesDropdown;
