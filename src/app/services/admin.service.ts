import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  getUserUrl: string;
  getUserDetail: string;
  updateAdminUrl: string;
  constructor(private http: HttpClient) {
    this.getUserDetail = "https://localhost:7124/api/Admin/GetById?Id=";
    this.getUserUrl = "https://localhost:7124/api/User/user/userId/";
    this.updateAdminUrl = "https://localhost:7124/api/Admin/Update";
  }

  getUserIdByUsername(username: string): Observable<number> {
    const url = `${this.getUserUrl}${username}`;
    return this.http.get<number>(url);
  }
  getUserDetailsById(userId: number): Observable<any> {
    const url = `${this.getUserDetail}${userId}`;
    return this.http.get<any>(url);
  }
  updateAdmin(admin: any): Observable<any> {

    return this.http.put<any>(this.updateAdminUrl, admin);
  }

  updateTax(data: any) {
    const tax = {
      "id": "1",
      "taxPercent": data.taxPercent
    }
    console.log(tax)
    return this.http.put("https://localhost:7124/api/Tax/update", data);
  }
  getTaxPercent() {
    return this.http.get("https://localhost:7124/api/Tax/getAll");
  }

}
