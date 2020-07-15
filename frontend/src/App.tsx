import React from 'react';
import './index.css';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HospitalSearch from './components/HospitalSearch';
import AppointmentScheduler from './components/AppointmentScheduler';
import HospitalAdminLandingPage from './components/HospitalAdminLandingPage'
import HospitalList from './components/HospitalList'
import HospitalInventoryEditor from './components/HospitalInventoryEditor'
import HospitalInventoryList from './components/HospitalInventoryList';
import HospitalAdminDashboard from './components/HospitalAdminDashboard';
import CognitoLoginAndReg from './components/CognitoLoginAndReg'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <main>
            <Switch>
              <Route path="/hospitals/:hospitalId/admin-dashboard">
                <HospitalAdminDashboard />
              </Route>
              <Route path="/login">
                <CognitoLoginAndReg />
              </Route>
              <Route path="/hospitals/:hospitalId/admin">
                <HospitalAdminLandingPage />
              </Route>
              <Route path="/hospitals/:hospitalId/inventory">
                <HospitalInventoryList />
              </Route>
              <Route path="/hospitals/:hospitalId/edit">
                <HospitalInventoryEditor />
              </Route>
              <Route path="/hospitals/:hospitalId/book-appointment">
                <AppointmentScheduler />
              </Route>
              <Route path="/hospitals">
                <HospitalList />
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
