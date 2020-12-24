import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import GameRoom from './pages/GameRoom'
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <Router>
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
