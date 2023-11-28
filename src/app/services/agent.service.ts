import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agent } from '../model/Agent';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  addPlanUrl: string;
  getPlanUrl: string;
  updatePlanUrl: string;
  deletePlanUrl: string;
  getUserDetail: string;
  getUserUrl: string;
  getByAgentId: string;
  constructor(private http: HttpClient) {
    this.addPlanUrl = 'https://localhost:7124/api/Agent/Add';
    this.getPlanUrl = 'https://localhost:7124/api/Agent/GetAllAgents';
    this.updatePlanUrl = 'https://localhost:7124/api/Agent/Update';
    this.deletePlanUrl = 'https://localhost:7124/api/Agent/Delete';
    this.getUserDetail = 'https://localhost:7124/api/Agent/GetById?Id=';
    this.getUserUrl = "https://localhost:7124/api/User/user/userId/";
    this.getByAgentId = "https://localhost:7124/api/Agent/Id?Id=";
  }
  addAgent(agent: Agent): Observable<Agent> {

    return this.http.post<Agent>(this.addPlanUrl, agent);


  }
  getAllagent(): Observable<Agent[]> {
    return this.http.get<Agent[]>(this.getPlanUrl);

  }
  updateAgent(agent: any): Observable<any> {

    return this.http.put<Agent>(this.updatePlanUrl, agent);
  }
  deleteAgent(agent: Agent): Observable<Agent> {
    return this.http.delete<Agent>(this.deletePlanUrl + '/' + agent.agentId)
  }
  get(pgNo?: number, pgSize?: number) {

    return this.http.get("https://localhost:7124/api/Agent/get?PageNumber=" + pgNo + "&PageSize=" + pgSize, { observe: 'response' });
  }
  getUserDetailsById(userId: number): Observable<any> {
    const url = `${this.getUserDetail}${userId}`;
    return this.http.get<any>(url);
  }
  containsOnlyDigits(s: string) {
    return /^\d+$/.test(s);
  }
  getFilter(pgNo?: number, pgSize?: number, searchQuery?: any) {
    var serachUrl = "https://localhost:7124/api/Agent/get?PageNumber=" + pgNo + "&PageSize=" + pgSize;
    if (searchQuery !== undefined) {
      if (this.containsOnlyDigits(searchQuery)) {
        searchQuery = parseInt(searchQuery);
      }

      serachUrl += (typeof searchQuery === 'number') ? `&Id=${searchQuery} ` : `&FirstName=${searchQuery}`;
    }
    return this.http.get(serachUrl, { observe: 'response' });

  }
  getUserIdByUsername(username: string): Observable<number> {
    const url = `${this.getUserUrl}${username}`;
    return this.http.get<number>(url);
  }

  getAgentProfile() {
    let userName = localStorage.getItem('username');
    return this.http.get("https://localhost:7124/api/Agent/getProfile?name=" + userName)
  }


  getById(AgentId: number): Observable<any> {
    const url = `${this.getByAgentId}${AgentId}`;
    return this.http.get<any>(url);
  }
}
