import './App.css';
import PayrollForm from './component/payroll-form/payroll-form';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" >
            <PayrollForm/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
