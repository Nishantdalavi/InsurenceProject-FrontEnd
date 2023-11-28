import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Customer } from '../model/Customer';
import { Policy } from '../model/Policy';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  addPlanUrl: string;
  getPlanUrl: string;
  updatePlanUrl: string;
  deletePlanUrl: string;
  getUserDetail: string;
  getById: string;
  getByAgent: string;
  getByCustomerId: string;
  commissionUrl: string;
  constructor(private http: HttpClient) {
    this.addPlanUrl = 'https://localhost:7124/api/Customer/add';
    this.getPlanUrl = 'https://localhost:7124/api/Customer/GetAll';
    this.updatePlanUrl = 'https://localhost:7124/api/Customer/Update';
    this.deletePlanUrl = 'https://localhost:7124/api/Customer/Delete';
    this.getUserDetail = 'https://localhost:7124/api/Customer/GetByUserId?Id=';
    this.getById = 'https://localhost:7124/api/Policy/ByCustomerId/';
    this.getByAgent = 'https://localhost:7124/api/Customer/GetByAgentId/';
    this.getByCustomerId = 'https://localhost:7124/api/Customer/GetById?Id=';
    this.commissionUrl = 'https://localhost:7124/api/Commission/Add';
  }
  addCustomer(customer: Customer): Observable<Customer> {

    return this.http.post<Customer>(this.addPlanUrl, customer);
  }
  getCustomers(pgNo?: number, pgSize?: number) {

    return this.http.get("https://localhost:7124/api/Customer/get?PageNumber=" + pgNo + "&PageSize=" + pgSize, { observe: 'response' });
  }
  getAllcustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.getPlanUrl);

  }
  updateCustomer(customer: any): Observable<Customer> {

    return this.http.put<Customer>(this.updatePlanUrl, customer);
  }
  deleteCustomer(customer: Customer): Observable<Customer> {
    return this.http.delete<Customer>(this.deletePlanUrl + '/' + customer.customerId)
  }
  getUserDetailsById(userId: number): Observable<any> {
    const url = `${this.getUserDetail}${userId}`;
    return this.http.get<any>(url);
  }
  getUserDetailsByCustomerId(customerId: number): Observable<any> {
    const url = `${this.getByCustomerId}${customerId}`;
    return this.http.get<any>(url);
  }
  getPoliciesByCustomerId(customerId: number): Observable<any> {
    const url = `${this.getById}${customerId}`;
    return this.http.get(url);
  }
  containsOnlyDigits(s: string) {
    return /^\d+$/.test(s);
  }
  getFilter(pgNo?: number, pgSize?: number, searchQuery?: any) {
    var serachUrl = "https://localhost:7124/api/Customer/get?PageNumber=" + pgNo + "&PageSize=" + pgSize;
    if (searchQuery !== undefined) {
      if (this.containsOnlyDigits(searchQuery)) {
        searchQuery = parseInt(searchQuery);
      }

      serachUrl += (typeof searchQuery === 'number') ? `&Id=${searchQuery} ` : `&FirstName=${searchQuery}`;
    }
    return this.http.get(serachUrl, { observe: 'response' });

  }

  getCustomersByAgentId(agentId: number): Observable<any> {
    const url = `${this.getByAgent}${agentId}`;
    return this.http.get(url);
  }
  getPlanByID(planId: number): Observable<any> {
    return this.http.get("https://localhost:7124/api/InsurancePlans/GetById?Id=" + planId)


  }
  getDetail(schemeId: any): Observable<any> {
    return this.http.get("https://localhost:7124/api/SchemeDetails/GetById?Id=" + schemeId)
  }
  policy!: Policy
  setPolicy(policy: Policy) {
    this.policy = policy
  }
  getPolicy(): Policy {
    return this.policy
  }
  //----------------------------------------------------------------------------------------------------\



  customerUrl = "https://localhost:7124/api/Customer/";
  planUrl = "https://localhost:7124/api/InsurancePlans/";
  planToScheme: any

  public data: any;
  fetchData(userName: string) {

    return this.http.get(this.customerUrl + "getProfile?name=" + userName);
  }


  getData(): any {
    console.log(this.data);
    return this.data;
  }
  getAllPlan() {
    return this.http.get(this.planUrl + "GetAll");
  }


  getCustomerProfile() {
    let userName = localStorage.getItem('username');
    return this.http.get("https://localhost:7124/api/Customer/getProfile?name=" + userName)
  }
  purchasePolicy(policy: Policy) {
    return this.http.post("https://localhost:7124/api/Policy/add", policy);
  }
  getPolicies(userName: string, pgNo?: number, pgSize?: number, searchQuery?: any) {
    var serachUrl = "https://localhost:7124/api/Customer/policies?PageNumber=" + pgNo + "&PageSize=" + pgSize + "&userName=" + userName;
    if (searchQuery !== undefined) {
      serachUrl += `&Id=${searchQuery}`;
    }
    return this.http.get(serachUrl, { observe: 'response' });
  }

  getTaxPercent() {
    return this.http.get("https://localhost:7124/api/Tax/get");
  }


  //--------------------------------------------------------------------------
  // uploadDocument(data: any, id: number) {
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'multipart/form-data');
  //   return this.http.post("https://localhost:7124/api/Document/upload?id=" + id, data, { headers });
  // }
  uploadDocument(file: File, id: number, name: string) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`https://localhost:7124/api/Document/upload?id=${id}&name=${name}`, formData);
  }

  downloadFile(fileId: number): Observable<HttpResponse<Blob>> {
    const url = `https://localhost:7124/api/Document/download?documentId=${fileId}`; // Replace with your server's endpoint
    return this.http.get(url, {
      observe: 'response', // This is crucial to get the full HTTP response, including headers
      responseType: 'blob', // Specify that you expect binary data (a file) in the response
    });
  }
  getCustomerDocuments() {
    return this.http.get("https://localhost:7124/api/Document/GetAllDocuments", { observe: 'response' });
  }
  updateCustomerDocuments(documnetId: number) {
    return this.http.put("https://localhost:7124/api/Document/update?documentId=" + documnetId, { observe: 'response' });
  }
  getCustomerDocumentsOnly(customerId: number, pgNo?: number, pgSize?: number) {
    return this.http.get("https://localhost:7124/api/Customer/documents?PageNumber=" + pgNo + "&PageSize=" + pgSize + "&customerID=" + customerId, { observe: 'response' });
  }

  createCommission(commissionData: any): Observable<any> {
    return this.http.post<any>(`${this.commissionUrl}/Add`, commissionData);
  }



  getPolicyDetail(policyId: any): Observable<any> {
    return this.http.get(" https://localhost:7124/api/Policy/GetById?Id=" + policyId)
  }



  getCustomerById(customerId: any): Observable<any> {
    return this.http.get(" https://localhost:7124/api/Customer/GetById?Id=" + customerId)
  }



  getSchemeById(schemeId: any): Observable<any> {
    return this.http.get("https://localhost:7124/api/InsuranceScheme/GetById?Id=" + schemeId)
  }


  makePayment(data: any) {
    return this.http.post("https://localhost:7124/api/Payment/Add", data);
  }

  addClaimUrl: string = 'https://localhost:7124/api/Claim/Add'
  registerClaim(data: any) {
    return this.http.post(this.addClaimUrl, data);
  }

  deleteDocument(documentId: number) {
    return this.http.put(`https://localhost:7124/api/Document/delete?documentId=${documentId}`, { observe: 'response' });

  }
}
