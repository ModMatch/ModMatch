import React, {useState} from 'react';
import Header from './components/Header';
import Home from './components/Home';
import SignupForm from './components/Signup/SignupForm';

function Main() {

  return (
    <div className="Main">
      Welcome to ModMatch
      <SignupForm />
    </div>
  );
  
}

export default Main;
