import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = "https://localhost:7124/api/User/Login"
  getUserUrl: string;
  getRoleUrl: string;
  updateUrl: string;
  constructor(private http: HttpClient) {
    this.getRoleUrl = "https://localhost:7124/api/User/user/roleId/";
    this.getUserUrl = "https://localhost:7124/api/User/user/userId/";
    this.updateUrl = "https://localhost:7124/api/User/update-password";
  }
  login(data: any) {
    return this.http.post(this.url, data);
  }

  getRoleByUsername(username: string): Observable<string> {
    return this.http.get<string>(`${this.getRoleUrl}${username}`);
  }

  getRoleForAgent(username: string): Observable<string> {
    return this.http.get<string>("https://localhost:7124/api/Agent/GetByUserId?Id=")
  }
  getUserIdByUsername(username: string): Observable<number> {
    const url = `${this.getUserUrl}${username}`;
    return this.http.get<number>(url);
  }

  updatePassword(username: string, newPassword: string) {
    const body = { username, newPassword };
    return this.http.put(this.updateUrl, body);
  }
  getCustomerByUserId(userId: any) {
    return this.http.get("https://localhost:7124/api/Customer/GetByUserId?Id=" + userId)
  }
}
