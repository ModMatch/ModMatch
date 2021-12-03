import React, {Component} from 'react';
import Header from './components/Header';
import Home from './components/Home';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: "WuMH"
    }
  }

  render() {
    return (
      <div className="App">
        <Header username={this.state.user}/>
        <Home user={this.state.user}/>
      </div>
    );
  }
  
}

export default App;
