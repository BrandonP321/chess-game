import React from 'react'
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import GameRoom from './pages/GameRoom'
import Home from './pages/Home'
import GameHeader from './components/GameHeader';

function App() {
  return (
    <div className="App">
      {/* <Router basename={process.env.PUBLIC_URL}> */}
      <Router basename={'/chess-game'}>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/game/:room'>
            <GameRoom />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
