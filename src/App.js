import React, {useState} from 'react';
import Header from './components/Header';
import Home from './components/Home';

function App() {

  const [user, setUser] = useState("Wumh");

  return (
    <div className="App">
      <Header username={user}/>
      <Home user={user}/>
    </div>
  );
  
}

export default App;
