import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  addPlanUrl: string;
  getPlanUrl: string;
  updatePlanUrl: string;
  deletePlanUrl: string;
  getUserDetail: string;
  constructor(private http: HttpClient) {
    this.addPlanUrl = 'https://localhost:7124/api/Employee/Add';
    this.getPlanUrl = 'https://localhost:7124/api/Employee/GetAll';
    this.updatePlanUrl = 'https://localhost:7124/api/Employee/Update';
    this.deletePlanUrl = 'https://localhost:7124/api/Employee/Delete';
    this.getUserDetail = 'https://localhost:7124/api/Employee/GetByUSerId?Id=';

  }
  addEmployee(employee: Employee): Observable<Employee> {

    return this.http.post<Employee>(this.addPlanUrl, employee);


  }


  getAllemployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.getPlanUrl);

  }
  updateEmployee(employee: any): Observable<Employee> {

    return this.http.put<Employee>(this.updatePlanUrl, employee);
  }
  deleteEmployee(employee: Employee): Observable<Employee> {
    return this.http.delete<Employee>(this.deletePlanUrl + '/' + employee.employeeId)
  }



  getEmployee(pgNo?: number, pgSize?: number) {

    return this.http.get("https://localhost:7124/api/Employee/get?PageNumber=" + pgNo + "&PageSize=" + pgSize, { observe: 'response' });
  }

  getUserDetailsById(userId: number): Observable<any> {
    const url = `${this.getUserDetail}${userId}`;
    return this.http.get<any>(url);
  }
  containsOnlyDigits(s: string) {
    return /^\d+$/.test(s);
  }
  getFilterEmployees(pgNo?: number, pgSize?: number, searchQuery?: any) {
    var serachUrl = "https://localhost:7124/api/Employee/get?PageNumber=" + pgNo + "&PageSize=" + pgSize;
    if (searchQuery !== undefined) {
      if (this.containsOnlyDigits(searchQuery)) {
        searchQuery = parseInt(searchQuery);
      }

      serachUrl += (typeof searchQuery === 'number') ? `&Id=${searchQuery} ` : `&FirstName=${searchQuery}`;
    }
    return this.http.get(serachUrl, { observe: 'response' });

  }
}
