import configuration from '../config/configuration.js';
import axios from 'axios';
class EmployeeService{
    url=configuration.url;
    addEmployeeDataToJSON(data){
        axios.post(`${this.url}employee`,data)
    }
}
export default EmployeeService