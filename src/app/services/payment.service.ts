import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../model/Payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  addPlanUrl: string;
  getPlanUrl: string;
  updatePlanUrl: string;
  deletePlanUrl: string;
  getById: string;
  constructor(private http: HttpClient) {
    this.addPlanUrl = 'https://localhost:7124/api/Payment/Add';
    this.getPlanUrl = 'https://localhost:7124/api/Payment/GetAll';
    this.updatePlanUrl = 'https://localhost:7124/api/Customer/Update';
    this.deletePlanUrl = 'https://localhost:7124/api/Payment/Delete';
    this.getById = 'https://localhost:7124/api/Payment/GetByCustomerId/';
  }
  add(payment: Payment): Observable<Payment> {

    return this.http.post<Payment>(this.addPlanUrl, payment);
  }
  // getCustomers(pgNo?: number, pgSize?: number) {

  //   return this.http.get("https://localhost:7124/api/Customer/get?PageNumber=" + pgNo + "&PageSize=" + pgSize, { observe: 'response' });
  // }
  get(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.getPlanUrl);

  }
  // updateCustomer(customer: Payment): Observable<Payment> {

  //   return this.http.put<Payment>(this.updatePlanUrl, customer);
  // }
  delete(payment: Payment): Observable<Payment> {
    return this.http.delete<Payment>(this.deletePlanUrl + '/' + payment.paymentId)
  }

  getPayment(pgNo?: number, pgSize?: number) {

    return this.http.get("https://localhost:7124/api/Payment/get?PageNumber=" + pgNo + "&PageSize=" + pgSize, { observe: 'response' });
  }
  getPaymentByCustomerId(customerId: number): Observable<any> {
    const url = `${this.getById}${customerId}`;
    return this.http.get(url);
  }

}
