import React from 'react';
import './index.css';
import Header from './components/Header';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HospitalSearch from './components/HospitalSearch';
import HospitalMap from './components/HospitalMap';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <main>
            <Switch>
              <Route path="/">
                <HospitalSearch />
              </Route>
            </Switch>
          </main>
        </Router>

        <div id="map">
          <HospitalMap />
        </div>
      </div>
    );
  }
}

export default App;
