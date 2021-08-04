import React from 'react'; 
import logo from "C:\\Users\\ayuanshi\\React\\employee_payroll\\src\\images\\images\\logo.png";
class PayrollHome extends React.Component{
    render(){
        return(
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
                            <div class="emp-count"></div>
                        </div>
                        <a href="../html/EmployeeForm.html" className="add-button">
                            <img src="../images/icons/add-24px.svg" alt="">Add User</img>
                        </a>
                    </div> 
                    <div className="table-main">
                        <table id ="display" className="table">
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}