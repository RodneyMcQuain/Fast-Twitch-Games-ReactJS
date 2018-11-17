import React, { Component } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import {default as GamesDropdown} from './GamesDropdown';
import {default as Status} from './Status';

/*Class for the header section for project, that contains the controls
  for the application.*/
class Header extends Component {
  constructor(props) {
    super(props);

    /*gameValue and gameName are separate state variables so that GamesDropdown
      isn't updated everytime something is typed in the textbox. Instead it is
      only updated when the add game button is clicked.*/
    this.state = {
      games: [],
      gameName: "",
      gameValue: "",
      statusGood: false,
      statusBad: false
    }

    this.handleOnChange_tbGame = this.handleOnChange_tbGame.bind(this);
    this.handleOnClick_btAddGame = this.handleOnClick_btAddGame.bind(this);
    this.handleOnClick_btRemoveGame = this.handleOnClick_btRemoveGame.bind(this);
    this.handleOnClick_btMoveGameToTop = this.handleOnClick_btMoveGameToTop.bind(this);
    this.setStatusBad = this.setStatusBad.bind(this);
    this.setStatusGood = this.setStatusGood.bind(this);
  }

  //Loads games from local storage after mount.
  componentDidMount() {
    let gamesStorage = JSON.parse(localStorage.getItem("games"));

    if (gamesStorage != null && gamesStorage.trim() !== "") {
      let gamesArr = gamesStorage.split(",;:!");
      this.setState({games: gamesArr}, this.setSelectedGameToFirst);
    }
  }

  //Sets statusBad based on response from HeaderStatus.
  setStatusBad(statusBad) {
    this.setState({statusBad: statusBad});
  }

  //Sets statusGood based on response from HeaderStatus.
  setStatusGood(statusGood) {
    this.setState({statusGood: statusGood});
  }

  //OnClick event for the add game button.
  handleOnClick_btAddGame(e) {
    const { games, gameName } = this.state;

    for (let i = 0; i < games.length; i++) {
      if (games[i] == gameName) {
        this.setState({statusBad: true}, this.setState({statusBad: false}));
        return;
      }
    }

    this.setState({
      games: games.concat(gameName),
      gameValue: gameName
    }, this.setGameComboBoxLocalStorage);

    //When a game is added it becomes the selected game.
    this.props.setSelectedGame(this.state.gameName);

    /*Clear text box after addition of game and set statusGood
      to true because the addition was successful.*/
    this.setState({
      gameName: "",
      statusGood: true
    });
  }

  //OnClick event for the remove game button.
  handleOnClick_btRemoveGame(e) {
    const games = this.state.games;

    for (let i = 0; i < games.length; i++)
      if (games[i] === this.props.selectedGame) {
        games.splice(i, 1);
        break;
      }

    this.setState({games: games}, this.setSelectedGameToFirstAndComboBoxLocalStorage);
  }

  //OnClick event for the move game to top button.
  handleOnClick_btMoveGameToTop(e) {
    const games = this.state.games;

    for (let i = 0; i < games.length; i++)
      if (games[i] === this.props.selectedGame) {
        games.unshift(games[i]);
        games.splice(i + 1, 1);
        break;
      }

    this.setState({games: games}, this.setGameComboBoxLocalStorage);
  }

  //OnChange event for when the text in the game text box changes.
  handleOnChange_tbGame(e) {
    this.setState({gameName: e.target.value});
  }

  /*Just calls setSelectedGame() and setGameComboBoxLocalStorage(). Used
    for setState callbacks.*/
  setSelectedGameToFirstAndComboBoxLocalStorage() {
    this.setSelectedGameToFirst();
    this.setGameComboBoxLocalStorage();
  }

  /*Sets the selected game to the first in the array if
    length is greater than 0. Used after removal of a game
    and when initially loading the game dropdown.*/
  setSelectedGameToFirst() {
    const games = this.state.games;

    if (games.length > 0)
      this.props.setSelectedGame(games[0]);
    else if (games.length === 0)
      this.props.setSelectedGame("");
  }

  /*Sets the local storage after addition, removal, or moving up
    of a game.*/
  setGameComboBoxLocalStorage() {
    const games = this.state.games;

    let toStoreString = games.join(",;:!");
    localStorage.setItem('games', JSON.stringify(toStoreString));
  }

  /*Render the Header with the add game textbox, add game button,
    games dropdown, remove game button, move game to top button, and status*/
  render() {
    return (
      <div id="add-game-container">
        <input value={this.state.gameName} onChange={this.handleOnChange_tbGame} className="text-field fa" placeholder="&#xf11b; Game to Add"></input>
        <button onClick={this.handleOnClick_btAddGame} id="btn-game-to-add" className="btn fa fa-plus"></button>

        <div>
          <GamesDropdown gameValue={this.state.gameValue} games={this.state.games} setSelectedGame={this.props.setSelectedGame} />
          <button onClick={this.handleOnClick_btRemoveGame} className="btn fa fa-trash"></button>
          <button onClick={this.handleOnClick_btMoveGameToTop} className="btn fa fa-arrow-up"></button>
        </div>
        <Status setStatusGood={this.setStatusGood} statusGood={this.state.statusGood} setStatusBad={this.setStatusBad} statusBad={this.state.statusBad} />
      </div>
    );
  }
}

export default Header;
