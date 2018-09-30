import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
// import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";

class App extends Component {
  state = {
    friends,
    selections: [],
    max: 0,
    score: 0
  };

  checkFriend = id => {
    let selections = this.state.selections;
    if (selections.indexOf(id) > -1) {

      this.state.max = this.state.max < this.state.score ? this.state.score : this.state.max;
      this.state.score = 0;
      selections = [];
    } else {
      this.state.score++;
      selections.push(id);
    }
    const friends = this.state.friends;

    for (let i = friends.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [friends[i], friends[j]] = [friends[j], friends[i]];
    }
    this.setState({ friends, selections });
  };

  render() {
    return (
      <Wrapper>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="text-center">Clicky Game!</h1>
            <p className="lead text-center">Click on an image to start the game and to earn points, but do not click on any image more than once!</p>
          </div>
          <div className="navbar-inner">
        <h1> <span className="navbar-brand " >Score: {this.state.score} &nbsp;&nbsp;&nbsp;&nbsp; Top Score: {this.state.max}</span></h1>
          </div>
        </div>
        {this.state.friends.map(friend => (
          <FriendCard
            removeFriend={this.checkFriend}
            id={friend.id}
            key={friend.id}
            image={friend.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
