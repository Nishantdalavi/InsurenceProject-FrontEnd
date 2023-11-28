import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  url = "https://localhost:7124/api/Claim/"; // Replace with the actual API endpoint for claim operations
  addPlanUrl: string;
  getPlanUrl: string;
  updatePlanUrl: string;
  deletePlanUrl: string;
  getUserDetail: string;
  getById: string;
  constructor(private http: HttpClient) {
    this.addPlanUrl = 'https://localhost:7124/api/Claim/Add';
    this.getPlanUrl = 'https://localhost:7124/api/Claim/GetAll';
    this.updatePlanUrl = 'https://localhost:7124/api/Claim/UpdateClaim';
    this.deletePlanUrl = 'https://localhost:7124/api/Claim/Delete/';
    this.getUserDetail = 'https://localhost:7124/api/Agent/GetById?Id=';
    this.getById = 'https://localhost:7124/api/Claim/GetById?Id=';
  }

  getClaims() {
    return this.http.get(this.getPlanUrl);
  }

  getClaimById(claimId: any) {
    return this.http.get(this.getById + claimId);
  }

  addClaim(data: any) {
    return this.http.post(this.addPlanUrl, data);
  }

  updateClaim(data: any) {
    return this.http.put(this.updatePlanUrl, data);
  }

  deleteClaim(claimId: any) {
    return this.http.delete(this.deletePlanUrl + claimId);
  }


  //--------------------------------------------------------

}
