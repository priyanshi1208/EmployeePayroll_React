import React from 'react';
import logo from "C:\\Users\\ayuanshi\\React\\employee_payroll\\src\\images\\images\\logo.png";
import addButton from '../../images/icons/add-24px.svg';
import EmployeeService from '../../service/employeeService';
import '../payroll-home/payroll-home.scss';
import Display from '../Display/display';
import {Link,withRouter,useParams} from 'react-router-dom';

class PayrollHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          allEmployeeList: [],
          employeeData: [],
          empCount:""
        };
        this.employeeService = new EmployeeService();    
      }
      componentDidMount() {
        this.getEmployeeList();
      }
    
      getEmployeeList = () => {
        this.employeeService.getAllEmployees()
        .then(responseData => {
          console.log("Data received after GET Call :\n" + responseData.data);
          this.setState({allEmployeeList: responseData.data});
          this.setState({employeeData: responseData.data});
          this.setState({empCount:responseData.data.length});
        }).catch(errror => {
          console.log("Error while fetching Employee List\nError : " + JSON.stringify(errror));
        })
      }
    render() {
        return (
            <div>
                <header className="header-content">
                    <div className="logo-content">
                        <img src={logo} alt="Employee logo"></img>
                        <div>
                            <span className="emp-text">EMPLOYEE</span><br></br>
                            <span className="emp-text emp-payroll">PAYROLL</span>
                        </div>
                    </div>
                </header>
                <div className="main-content">
                    <div className="main-header">
                        <div className="emp-detail-text">Employee Details 
                            <div className="emp-count">{this.state.empCount}</div>
                        </div>
                        <Link to="/form" className="add-button">
                           <img src={addButton} alt="add"></img>Add User
                        </Link>
                    </div> 
                    <div className="table-main">
                        <table id ="display" className="table">
                            <Display employeeData = {this.state.employeeData} />
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(PayrollHome)