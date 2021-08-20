import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAPI } from './APIHooks';

const App = () => {

  const [{ data: getActionMovieData, loading: isActionMovieLoading, error: getActionMovieError }, actionRefetch] = useAPI('movies/categories?lat=true&long=action');
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
