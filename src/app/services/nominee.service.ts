import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NomineeService {
  url = "https://localhost:7124/api/Nominie/"; // Replace with the actual API endpoint for nominee operations

  constructor(private http: HttpClient) { }

  getNominees() {
    return this.http.get(this.url + "GetAll");
  }

  getNomineeById(nomineeId: any) {
    return this.http.get(`${this.url}GetById ? Id = ${nomineeId}`);
  }

  addNominee(data: any) {
    return this.http.post(`${this.url}Add`, data);
  }

  updateNominee(data: any) {
    return this.http.put(`${this.url}Update`, data);
  }

  deleteNominee(nomineeId: any) {
    return this.http.delete(`${this.url}Delete / ${nomineeId}`);
  }
}
