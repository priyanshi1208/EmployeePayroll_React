import './App.css';
import PayrollForm from './component/payroll-form/payroll-form';
import PayrollHome from './component/payroll-home/payroll-home';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/form" >
            <PayrollForm/>
          </Route>
          <Route exact path="/home" >
            <PayrollHome/>
          </Route>
          <Route exact path="/form/:id"><PayrollForm /></Route>
          <Route exact path=""><Redirect exact from="/" to="/home" /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
