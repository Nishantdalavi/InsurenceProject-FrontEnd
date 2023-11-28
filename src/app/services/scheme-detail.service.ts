import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchemeDetailService {
  url = "https://localhost:7124/api/SchemeDetails/"; // Replace with the actual API endpoint for scheme detail operations

  constructor(private http: HttpClient) { }

  getSchemeDetails() {
    return this.http.get(this.url + "GetAll");
  }

  getSchemeDetailById(schemeDetailId: any) {
    return this.http.get(`${this.url}GetById?Id=${schemeDetailId}`);
  }

  addSchemeDetail(data: any) {
    return this.http.post(`${this.url}Add`, data);
  }

  updateSchemeDetail(data: any) {
    return this.http.put(`${this.url}Update`, data);
  }

  deleteSchemeDetail(schemeDetailId: any) {
    return this.http.delete(`${this.url}Delete/${schemeDetailId}`);
  }
}
