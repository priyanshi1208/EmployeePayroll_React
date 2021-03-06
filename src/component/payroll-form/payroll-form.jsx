import React from 'react';
import '../payroll-form/payroll-form.scss';
import logo from "C:\\Users\\ayuanshi\\React\\employee_payroll\\src\\images\\images\\logo.png";
import profile1 from "C:\\Users\\ayuanshi\\React\\employee_payroll\\src\\images\\profile-images\\Ellipse 1.png";
import profile2 from "C:\\Users\\ayuanshi\\React\\employee_payroll\\src\\images\\profile-images\\Ellipse -2.png";
import profile3 from "C:\\Users\\ayuanshi\\React\\employee_payroll\\src\\images\\profile-images\\Ellipse -4.png";
import profile4 from "C:\\Users\\ayuanshi\\React\\employee_payroll\\src\\images\\profile-images\\Ellipse -5.png";
import EmployeeService from '../../service/employeeService';
import {Link,withRouter,useParams} from 'react-router-dom';
const initialState = {
    name: '',
    profile: '',
    gender: '',
    department: [],    
    salary: 40000,
    Day: '1',
    Month: 'Jan',
    Year: '2020',
    startDate: new Date("1 Jan 2020"),
    Notes: '',
    id: '',      

}
class PayrollForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:"",
            name:"",
            profile:"",
            gender:"",
            department:[],
            salary:"40000",
            Day:"1",
            Month:"Jan",
            Year:"2021",
            Notes:"",
            textError:"",
            errorMessage:"",
            salaryError:"",
            dateError:"",
            startDate:new Date("1 Jan 2021"),
            departments:[
                'HR', 'Sales', 'Finance', 'Engineer', 'Others'
            ],
            isUpdate:false
        }
    }

    handleNameChange = (e) => {
        this.setState({name:e.target.value});
        const nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if(!nameRegex.test(e.target.value)){
            this.setState({textError: 'Invalid Name Format'})
            this.setState({errorMessage:true})
        }else{
            this.setState({textError:""})
        }
    }
    onCheckChange = (name) => {
        let index = this.state.department.indexOf(name);
        console.log(index)
        let checkArray = [...this.state.department]
        console.log(checkArray)
        if (index > -1)
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
        this.setState({department:checkArray});
    }
    deptChecked = (name) => {
        console.log(this.state.department && this.state.department.includes(name))
        return this.state.department && this.state.department.includes(name);
    }
    handleChange = (e) => {
        this.setState(
            {[e.target.name]:e.target.value});
            console.log(e.target.value);
    }
    handleMonthChange=(e)=>{
        this.handleChange(e);
        this.setStartDate(this.state.Day,e.target.value,this.state.year)
    }
    handleDayChange=(e)=>{
        this.handleChange(e);
        this.setStartDate(e.target.value,this.state.Month,this.state.year)
    }
    handleYearChange=(e)=>{
        this.handleChange(e);
        this.setStartDate(this.state.Day,this.state.Month,e.target.value)
    }
    setStartDate = (day, month, year) => {
        let startDateValue = new Date(`${day} ${month} ${year}`);
        this.setState({startDate: startDateValue});
        let now = new Date();
        console.log(now);
        let difference = Math.abs(now.getTime() - startDateValue.getTime());
        if (startDateValue > now) {
          this.setState({dateError:'Date Cannot be future Date'});
          this.setState({errorMessage:true})
        } else if (difference / (1000 * 60 * 60 * 24) > 30) {
            this.setState({dateError:'Date is beyond 30 days'});
            this.setState({errorMessage:true})
        } else {
          this.setState({dateError:''});
          this.setState({errorMessage:false});
        }
    }
    stringifyDate = (date) => {
        const options = { Day: 'numeric', Month: 'short', Year: 'numeric' };
        const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
        return newDate;
    }

    reset =() => {
        this.setState({...initialState});
    }

    handleSubmit = async(e) =>{
        e.preventDefault();
        if(this.state.errorMessage){
            window.alert("Please fill al the fields correctly");
        }else{
            let data={
                id:this.state.id,
                name:this.state.name,
                gender:this.state.gender,
                profile:this.state.profile,
                salary:this.state.salary,
                notes:this.state.Notes,
                startDate:this.stringifyDate(this.state.startDate),
                department:this.state.department
            }
            
            if(this.state.isUpdate){
                console.log(this.state.id)
                new EmployeeService().updateEmployee(data,this.props.match.params.id)
                .then(responseText => {
                    console.log("data Updated successfully" +JSON.stringify(responseText.data));
                    this.props.history.push('/home');
                 })
                 .catch(error => {
                    console.log("Error While Updated"+JSON.stringify(error));
                 })

            }else{
                const employeeService=new EmployeeService();
                employeeService.addEmployeeDataToJSON(data)
                .then((response)=>{
                    console.log("Data Added" +JSON.stringify(response.data));
                    window.alert("Data added to HomePage");
                    window.location.replace('/home');
                })
                .catch((error)=>{
                    console.log("error while adding data"+JSON.stringify(error.data));
                })
            }
        }
        
    }

    componentDidMount = () => {
        let id = this.props.match.params.id;
        if(id !== undefined && id !==''){
            new EmployeeService().getEmployeeById(id)
            .then(responseText => {
                this.setForm(responseText.data);
                console.log(responseText.data.name);
            }).catch(error => {
                console.log("Error while Fetching Data"+JSON.stringify(error.data));
            });
        }
    }

    setForm(employee){
        let Date = (employee.startDate).split(" ");
        this.setState(
            {
                name:employee.name,
                gender:employee.gender,
                profile:employee.profile,
                department:employee.department,
                salary:employee.salary,
                Notes:employee.notes,
                Day:Date[0],
                Month:Date[1],
                Year:Date[2],
                isUpdate:true
            }
        )
    }


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
        <div className="form-content">
            <form className="form" action="" onSubmit={this.handleSubmit}>
                <div className="form-header">Employee Payroll Form</div>
                <div className="row-content">
                    <label className="label text" htmlFor="name">Name</label>
                    <input className="input" type="text" id="name" name="name" value={this.state.name} placeholder="Enter Your Name" required
                    onChange={(e) => this.handleNameChange(e)}/>
                    <error-output className="text-error" htmlFor="text">{this.state.textError}</error-output>
                </div>
                <div className="row-content">
                    <label className="label text" htmlFor="Profile">Profile image</label>
                    <div className="profile-radio-content">
                        <label>
                            <input type="radio" id="profile1" name="profile"
                            value="profile1" required checked={this.state.profile==='profile1'}
                            onChange={(e) => this.handleChange(e)}/>
                                <img className="profile" id="image1"src={profile1} alt=""></img>                    
                        </label>
                        <label>
                            <input type="radio" id="profile2" name="profile"
                            value="profile2" required checked={this.state.profile==='profile2'} onChange={(e) => this.handleChange(e)}/>
                                <img className="profile" id="image2"src={profile2} alt=""></img>                    
                        </label>
                        <label>
                            <input type="radio" id="profile3" name="profile"
                            value="profile3" required checked={this.state.profile==='profile3'} onChange={(e) => this.handleChange(e)}/>
                                <img className="profile" id="image3"src={profile3} alt=""></img>                    
                        </label>
                        <label>
                            <input type="radio" id="profile4" name="profile"
                            value="profile4" required checked={this.state.profile==='profile4'} onChange={(e) => this.handleChange(e)}/>
                                <img className="profile" id="image4"src={profile4} alt=""></img>                    
                        </label>
                    </div>
                </div>    
                <div className="row-content">
                    <label className="label text" htmlFor="gender">Gender</label>
                    <div>
                        <input type="radio" id="male" name="gender" value="Male" checked={this.state.gender === 'Male'}onChange={(e) => this.handleChange(e)}/>
                        <label className="text" htmlFor="male">Male</label>
                        <input type="radio" id="female" name="gender" value="Female" checked={this.state.gender === 'Female'}onChange={(e) => this.handleChange(e)}/>
                        <label className="text" htmlFor="female">Female</label>
                        <input type="radio" id="other" name="gender" value="Other" checked={this.state.gender === 'Other'}onChange={(e) => this.handleChange(e)}/>
                        <label className="text" htmlFor="other">Other</label>
                    </div>
                </div>
                <div className="row-content">
                    <label className="label text" htmlFor="department">Department</label>
                    <div>
                        {this.state.departments.map(dept=>(
                            <span key={dept}>
                                <input className="checkbox" type="checkbox" id={dept} name="department" value={dept} checked={this.deptChecked(dept)} onChange={(e)=>this.onCheckChange(dept)} />
                                <label className="text" htmlFor={dept}>{dept}</label>
                            </span>
                            
                        ))}
                    </div>
                </div>
                <div className="row-content">
                    <label className="label text" htmlFor="salary">Salary</label>
                    <input className="input" type="range" name="salary" id="salary" min="300000"
                        max="500000" step="100" value={this.state.value} onChange={(e) => this.handleChange(e)}/>
                    <output className="salary-output text" htmlFor="salary">{this.state.salary}</output>
                </div> 
                <div className="row-content">
                    <label className="label text" htmlFor="startDate">Start Date</label>
                    <div id="date">
                        <select id="day" name="Day"value={this.state.Day} onChange={(e) => this.handleDayChange(e)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>
                        <select id="month" name="Month" value={this.state.Month} onChange={(e) => this.handleMonthChange(e)}>
                            <option value="Jan">January</option>
                            <option value="Feb">February</option>
                            <option value="Mar">March</option>
                            <option value="Apr">April</option>
                            <option value="May">May</option>
                            <option value="Jun">June</option>
                            <option value="Jul">July</option>
                            <option value="Aug">August</option>
                            <option value="Sep">September</option>
                            <option value="Oct">October</option>
                            <option value="Nov">November</option>
                            <option value="Dec">December</option>
                        </select>
                        <select id="year" name="Year" value={this.state.Year} onChange={(e) => this.handleYearChange(e)}>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                        </select>
                    </div>
                    <error-output className="date-error" htmlFor="startDate">{this.state.dateError}</error-output>
                </div>
                <div className="row-content">
                    <label className="label text" htmlFor="notes">Notes</label>
                    <textarea id="notes" className="input"name="Notes" placeholder="" value={this.state.Notes} onChange={(e) => this.handleChange(e)}></textarea>
                </div>
                <div className="button-content">
                    <a href="./HomePage.html" className="resetButton button cancelButton">Cancel</a>
                    <div className="submit-reset">
                        <button type="submit" className="button submitButton" id="submitButton" >Submit</button>
                        <button type="reset" className="resetButton button" id="resetBtn">Reset</button>
                    </div>
                </div> 
            </form>
        </div>
    </div>
    );
    }
}
export default withRouter(PayrollForm)
