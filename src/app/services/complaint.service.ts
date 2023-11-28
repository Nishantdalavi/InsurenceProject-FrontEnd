import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  add: string;
  getPlanUrl: string;
  updatePlanUrl: string;
  deletePlanUrl: string;
  getUserDetail: string;
  getById: string;
  constructor(private http: HttpClient) {
    this.add = 'https://localhost:7124/api/Complaint/Add';
    this.getPlanUrl = 'https://localhost:7124/api/Complaint/GetAll';
    this.updatePlanUrl = 'https://localhost:7124/api/Complaint/Update';
    this.deletePlanUrl = 'https://localhost:7124/api/Complaint/Delete/';
    this.getUserDetail = 'https://localhost:7124/api/Complaint/GetById?Id=';
    this.getById = 'https://localhost:7124/api/Complaint/GetById?customerId=';
  }

  getComplaints() {
    return this.http.get(this.getPlanUrl);
  }

  getComplaintById(complaintId: any) {
    return this.http.get(this.getUserDetail + complaintId);
  }

  addComplaint(data: any) {
    return this.http.post(this.add, data);
  }

  updateComplaint(data: any) {
    return this.http.put(this.updatePlanUrl, data);
  }

  deleteComplaint(complaintId: any) {
    return this.http.delete(this.deletePlanUrl + complaintId);
  }
  getComplaintByCustomerId(customerId: number): Observable<any> {
    const url = `${this.getById}${customerId}`;
    return this.http.get(url);
  }
}
