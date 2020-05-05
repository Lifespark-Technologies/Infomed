import React from 'react';
import './App.css';
import Header from './components/Header';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HospitalSearch from './components/HospitalSearch';
import HospitalMap from './components/HospitalMap';
import { render } from '@testing-library/react';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <main>
          <Switch>
            <Route path="/">
              <HospitalSearch />
            </Route>
          </Switch>
          <HospitalMap />
        </main>
      </Router>
    );
  }
}

export default App;
