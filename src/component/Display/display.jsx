import React from 'react';
import '../Display/display.scss';
import updateIcon from '../../images/icons/create-black-18dp.svg';
import deleteIcon from '../../images/icons/delete-black-18dp.svg';
import profile1 from "C:\\Users\\ayuanshi\\React\\employee_payroll\\src\\images\\profile-images\\Ellipse 1.png";
import profile2 from "C:\\Users\\ayuanshi\\React\\employee_payroll\\src\\images\\profile-images\\Ellipse -2.png";
import profile3 from "C:\\Users\\ayuanshi\\React\\employee_payroll\\src\\images\\profile-images\\Ellipse -4.png";
import profile4 from "C:\\Users\\ayuanshi\\React\\employee_payroll\\src\\images\\profile-images\\Ellipse -5.png";
import {withRouter} from 'react-router-dom';
import EmployeeService from '../../service/employeeService';

const Display = (props) => {
    const update = (id) => {
        props.history.push(`/form/${id}`);
    }
    return(
        <table id ="display" className="table">
            <tbody>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Startdate</th>
                    <th>Actions</th>
                </tr>
                    {
                    props.employeeData.map((employee) => (
                    <tr key={employee.id}>
                        <td><img src={profilePicture(employee.profile)} alt="" /></td>
                        <td>{employee.name}</td>
                        <td>{employee.gender}</td>
                        <td>{employee.department.map(dept => (<div className="dept-label">{dept}</div>))}</td>
                        <td>{employee.salary}</td>
                        <td>{stringifyDate(employee.startDate)}</td>
                        <td><img src={deleteIcon} onClick={() => remove(employee.id)} alt="delete" />
                        <img src={updateIcon} onClick={() => update(employee.id)} alt="update" />
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}

const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}
const remove = (id) => {
    new EmployeeService().deleteEmployee(id)
    .then(responseText=>{
        this.setState({employeeData:responseText.data});
        this.setState({empCount:responseText.data.length});
        console.log("Delete data successfully:"+JSON.stringify(responseText));
    })
    .catch(error=>{
        console.log("Delete data Error:"+JSON.stringify(error));
    })
    window.location.reload();
}

const profiles = ['profile1','profile2','profile3','profile4'];

const profilePicture = (profilePath) => {
    let index ;
    for(let i = 0; i < profiles.length; i++){
        if(profiles[i] === profilePath){
            index = i;
        }
    }
    switch(index){
        case 0:
            return profile1;
        case 1:
            return profile2;
        case 2:
            return profile3;
        case 3:
            return profile4;
        default:
            return null; 
    }
}
export default withRouter(Display);