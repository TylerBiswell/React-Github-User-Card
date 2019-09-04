import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import MainCard from './components/MainCard';
import GithubCard from './components/GithubCard';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

const SearchBar = styled.div`
  background-color: #24292e;
  padding: 20px;
  input {
    background-color: #3f4448;
    color: #8d908d;
    border: none;
    outline: none;
    border-radius: 3px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    padding: 8px;
  }
  button {
    margin-left: 10px;
    border: none;
    outline: none;
    background-color: white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-family: 'Roboto', sans-serif;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: #8d908d;
    }
  }
`;

class App extends React.Component {
  state = {
    data: [],
    user: 'tylerbiswell',
    followers: [],
    search: '',
  };

  componentDidMount() {
    fetch(`https://api.github.com/users/${this.state.user}`)
      .then(res => res.json())
      .then(res => this.setState({ data: res }))
      .catch(err => console.log(err));

    fetch(`https://api.github.com/users/${this.state.user}/followers`)
      .then(res => res.json())
      .then(res => this.setState({ followers: res }))
      .catch(err => console.log(err));
  }

  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  fetchUser = event => {
    fetch(`https://api.github.com/users/${this.state.search}`)
      .then(res => res.json())
      .then(res => this.setState({ data: res }))
      .catch(err => console.log(err));

    fetch(`https://api.github.com/users/${this.state.search}/followers`)
      .then(res => res.json())
      .then(res => this.setState({ followers: res }))
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.state.followers);
    return (
      <div className='App'>
        <SearchBar>
          <input
            type='text'
            value={this.state.search}
            onChange={this.handleChange}
          />
          <button onClick={this.fetchUser}>Go!</button>
        </SearchBar>
        <GlobalStyle />
        <MainCard data={this.state.data} />
        {this.state.followers.map(user => (
          <GithubCard data={user} />
        ))}
      </div>
    );
  }
}

export default App;