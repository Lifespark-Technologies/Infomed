import React from 'react';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HospitalSearch from './components/HospitalSearch';
import AppointmentScheduler from './components/AppointmentScheduler';
import AppointmentTimePicker from './components/AppointmentTimePicker';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          {/* <AppointmentTimePicker timeSlots={slots} /> */}
          <main>
            <Switch>
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
