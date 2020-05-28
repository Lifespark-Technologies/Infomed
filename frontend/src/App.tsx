import React from 'react';
import './index.css';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HospitalSearch from './components/HospitalSearch';
import AppointmentScheduler from './components/AppointmentScheduler';
import HospitalDetail from './components/HospitalDetail'
import HospitalList from './components/HospitalList'
import HospitalInventoryList from './components/HospitalInventoryList'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <main>
            <Switch>
              <Route path="/hospital/list">
                <HospitalList />
              </Route>
              <Route path="/hospital/detail">
                <HospitalDetail />
              </Route>
              <Route path="/hospital/inventory/list">
                <HospitalInventoryList />
              </Route>
              <Route path="/hospitals/:hospitalId/book-appointment">
                <AppointmentScheduler />
              </Route>
              <Route path="/">
                <HospitalSearch />
              </Route>
            </Switch>
          </main>
        </Router>
      </div>
    );
  }
}

export default App;
