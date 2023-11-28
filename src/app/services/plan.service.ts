import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Plan } from '../model/Plan';
@Injectable({
  providedIn: 'root'
})
export class PlanService {
  addPlanUrl: string;
  getPlanUrl: string;
  updatePlanUrl: string;
  deletePlanUrl: string;
  constructor(private http: HttpClient) {
    this.addPlanUrl = 'https://localhost:7124/api/InsurancePlans/Add';
    this.getPlanUrl = 'https://localhost:7124/api/InsurancePlans/GetAll';
    this.updatePlanUrl = 'https://localhost:7124/api/InsurancePlans/Update';
    this.deletePlanUrl = 'https://localhost:7124/api/InsurancePlans/Delete/';

  }
  addInsurancePlan(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(this.addPlanUrl, plan);


  }
  getAllPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.getPlanUrl);

  }
  updatePlan(plan: Plan): Observable<Plan> {
    return this.http.put<Plan>(this.updatePlanUrl, plan);
  }
  deletePlan(plan: Plan): Observable<Plan> {
    return this.http.delete<Plan>(this.deletePlanUrl + plan.planId)
  }

  getPlanByID(planId: number): Observable<any> {
    return this.http.get("https://localhost:7124/api/InsurancePlans/GetById?Id=" + planId)


  }
  planToScheme: any;
  setPlan(plan: any) {
    this.planToScheme = plan
    console.log(this.planToScheme)
  }
  getPlan() {
    return this.planToScheme
  }
  getDetail(schemeId: any): Observable<any> {
    return this.http.get("https://localhost:7124/api/SchemeDetails/GetById?Id=" + schemeId)
  }
}


