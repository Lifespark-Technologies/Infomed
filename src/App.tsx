import React from 'react';
import './App.css';
import Header from './components/Header';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HospitalSearch from './components/HospitalSearch';
import AppointmentScheduler from './components/AppointmentScheduler';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/hospital/:hospitalId/book-appointment">
            <AppointmentScheduler />
          </Route>
          <Route path="/">
            <HospitalSearch />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
