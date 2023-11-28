import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {

  add: string;
  get: string;
  update: string;
  delete: string;
  getById: string;
  constructor(private http: HttpClient) {
    this.add = 'https://localhost:7124/api/Commission/Add';
    this.get = 'https://localhost:7124/api/Commission/Get';
    this.update = 'https://localhost:7124/api/Commission/Update';
    this.delete = 'https://localhost:7124/api/Commission/Delete/';
    this.getById = 'https://localhost:7124/api/Commission/GetById?Id=';
  }

  getCommissions() {
    return this.http.get(this.get);
  }

  getCommissionById(commissionId: any) {
    return this.http.get(this.getById + commissionId);
  }

  addCommission(data: any) {
    return this.http.post(this.add, data);
  }

  updateCommission(data: any) {
    return this.http.put(this.update, data);
  }

  deleteCommission(commissionId: any) {
    return this.http.delete(this.delete + commissionId);
  }

  getCommissionByAgentId(agentId: any) {
    return this.http.get("https://localhost:7124/api/Commission/GetByAgentId/" + agentId);
  }
}
