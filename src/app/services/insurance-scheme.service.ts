import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsuranceSchemeService {

  url = "https://localhost:7124/api/InsuranceScheme/"; // Replace with the actual API endpoint for scheme operations

  constructor(private http: HttpClient) { }

  getSchemes() {
    return this.http.get(this.url + "GetAll");
  }

  getSchemeById(schemeId: any) {
    return this.http.get(`${this.url}GetById?Id=${schemeId}`);
  }

  addScheme(data: any) {
    return this.http.post(`${this.url}Add`, data);
  }

  updateScheme(data: any) {
    return this.http.put(`${this.url}Update`, data);
  }

  deleteScheme(schemeId: any) {
    return this.http.delete(`${this.url}Delete / ${schemeId}`);
  }
}
