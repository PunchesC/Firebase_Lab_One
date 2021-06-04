import React from 'react';
import './App.css';
import ShoutOutsList from './components/ShoutOutsList';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import Header from './components/Header'
import ShoutOutsForTo from './components/ShoutOutsForTo'


function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <nav className="App_nav">
        <ul>
          <li><NavLink to="/to/David">David</NavLink></li>
        </ul>
      </nav>
      <Switch>
        <Route path="/to/:to">
         <ShoutOutsForTo />
        </Route>
        <Route path="/">
        <ShoutOutsList />
        </Route>
     
      </Switch>
    </div>
    </Router>
  );
}

export default App;
