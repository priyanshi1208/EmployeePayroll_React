import configuration from '../config/configuration.js';
import AxiosService from '../service/axios';
class EmployeeService{
    url=configuration.url;
    addEmployeeDataToJSON(data){
        return AxiosService.postService(`${this.url}employee`,data);
    }
    getAllEmployees() {
        return AxiosService.getService(`${this.url}employee`);
    }
    deleteEmployee(id){
        return AxiosService.deleteService(`${this.url}employee/${id}`);
    }
    putEmployee(id){
        return AxiosService.putService(`${this.url}employee/${id}`);
    }
    getEmployeeById(id){
        console.log(AxiosService.getService(`${this.url}employee/${id}`))
        return AxiosService.getService(`${this.url}employee/${id}`);
    }
    updateEmployee(employee,id){
        console.log(employee.id)
        return AxiosService.putService(`${this.url}employee/${id}`,employee)
    }
}
export default EmployeeService