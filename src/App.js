import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Home from './components/Home';
import useAuth from './hooks/useAuth';
import Loading from './components/Loading';

function App() {

  let {isAuth, name, id} = useAuth();

  if (!id) {
    return (
      <Loading/>
    )
  }


  return (
    <div className="App">
      <Header user={name} id={id}/>
      <Home id={id} name={name}/>
    </div>
  );
  
}

export default App;
