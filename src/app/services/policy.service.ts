import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Policy } from '../model/Policy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  addPlanUrl: string;
  getPlanUrl: string;
  updatePlanUrl: string;
  deletePlanUrl: string;
  getById: string;
  getByAgentId: string;
  constructor(private http: HttpClient) {
    this.getPlanUrl = 'https://localhost:7124/api/Policy/GetAll';
    this.addPlanUrl = 'https://localhost:7124/api/Policy/add';
    this.updatePlanUrl = 'https://localhost:7124/api/Policy/Update';
    this.deletePlanUrl = 'https://localhost:7124/api/Policy/Delete/';
    this.getById = 'https://localhost:7124/api/Policy/GetByCustomerId/';
    this.getByAgentId = 'https://localhost:7124/api/Policy/GetByAgentId/';
  }
  add(policy: Policy): Observable<Policy> {

    return this.http.post<Policy>(this.addPlanUrl, policy);


  }
  get(): Observable<Policy[]> {
    return this.http.get<Policy[]>(this.getPlanUrl);

  }
  update(policy: Policy): Observable<Policy> {

    return this.http.put<Policy>(this.updatePlanUrl, policy);
  }
  delete(policy: Policy): Observable<Policy> {
    return this.http.delete<Policy>(this.deletePlanUrl + policy.policyNo)
  }
  getPolicy(pgNo?: number, pgSize?: number) {

    return this.http.get("https://localhost:7124/api/Policy/get?PageNumber=" + pgNo + "&PageSize=" + pgSize, { observe: 'response' });
  }

  getPoliciesByCustomerId(customerId: number): Observable<any> {
    const url = `${this.getById}${customerId}`;
    return this.http.get(url);
  }
  getPoliciesByAgentId(agentId: number): Observable<any> {
    const url = `${this.getByAgentId}${agentId}`;
    return this.http.get(url);
  }
  getPolicyByCustomerId: string = "https://localhost:7124/api/Policy/GetById?Id="
  getPolicyById(policyId: number): Observable<any> {
    const url = `${this.getPolicyByCustomerId}${policyId}`;
    return this.http.get(url);
  }
}
