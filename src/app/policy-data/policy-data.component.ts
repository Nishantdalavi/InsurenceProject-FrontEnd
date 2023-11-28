import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Policy } from '../model/Policy';
import { PolicyService } from '../services/policy.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgentModalComponent } from '../agent-modal/agent-modal.component';
import { AgentService } from '../services/agent.service';
import { CustomerService } from '../services/customer.service';
import { CustomerModalComponent } from '../customer-modal/customer-modal.component';
import { SchemeDetailService } from '../services/scheme-detail.service';
import { SchemeModalComponent } from '../scheme-modal/scheme-modal.component';
import { SchemeDetail } from '../model/SchemeDetail';
import { Agent } from '../model/Agent';
import { InsuranceScheme } from '../model/InsuranceScheme';
import { ModalSchemeComponent } from '../modal-scheme/modal-scheme.component';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/Customer';
import { ModalCustomerComponent } from '../modal-customer/modal-customer.component';
import { ModalAgentComponent } from '../modal-agent/modal-agent.component';

@Component({
  selector: 'app-policy-data',
  templateUrl: './policy-data.component.html',
  styleUrls: ['./policy-data.component.css']
})
export class PolicyDataComponent {
  title = "Welcome To Policy API";
  policyDetail!: FormGroup;
  policyObj: Policy = new Policy();
  policyList: any = [];

  constructor(private policyService: PolicyService, private router: Router, private formBuilder: FormBuilder, private modalService: NgbModal, private agentService: AgentService
    , private customerService: CustomerService, private scheme: SchemeDetailService, private http: HttpClient) { }

  ngOnInit(): void {
    this.get();
    this.policyDetail = this.formBuilder.group({
      policyId: [''],
      issueDate: [''],
      maturityDate: [''],
      premium: [''],
      sumAssured: [''],
      status: [true], // Assuming status is initially set to true
      customerId: [''],
      agentId: [''],
      schemeId: [''],
      insuranceSchemeId: [''],

    });
  }
  addPolicy() {
    const policy: Policy = {
      issueDate: this.policyDetail.value.issueDate,
      maturityDate: this.policyDetail.value.maturityDate,
      premium: this.policyDetail.value.premium,
      sumAssured: this.policyDetail.value.sumAssured,
      schemeId: this.policyDetail.value.schemeId,
      customerId: this.policyDetail.value.customerId,
      agentId: this.policyDetail.value.agentId,
      status: this.policyDetail.value.status,
      policyNo: this.policyDetail.value.status,
      premiumMode: 0,
      totalPremiumNo: 0,
    };

    this.policyService.add(policy).subscribe((res) => {
      console.log(res);
      this.getAllPolicies();
    }, (err) => {
      console.log(err);
    });
  }

  getAllPolicies() {
    this.policyService.get().subscribe(
      res => {
        this.policyList = res;
      },
      (err) => {
        console.log("Unable to fetch policy data", err);
      }
    );
  }
  editPolicy(policy: Policy) {
    this.policyDetail.controls['policyId'].setValue(policy.policyNo);
    this.policyDetail.controls['issueDate'].setValue(policy.issueDate);
    this.policyDetail.controls['maturityDate'].setValue(policy.maturityDate);
    this.policyDetail.controls['premium'].setValue(policy.premium);
    this.policyDetail.controls['sumAssured'].setValue(policy.sumAssured);
    this.policyDetail.controls['schemeId'].setValue(policy.schemeId);
    this.policyDetail.controls['customerId'].setValue(policy.customerId);
    this.policyDetail.controls['agentId'].setValue(policy.agentId);
  }

  updatePolicy() {
    ;
    // Replace agentObj with policyObj to match the Policy entity
    this.policyObj.policyNo = this.policyDetail.value.policyId;
    this.policyObj.issueDate = this.policyDetail.value.issueDate;
    this.policyObj.maturityDate = this.policyDetail.value.maturityDate;
    this.policyObj.premium = this.policyDetail.value.premium;
    this.policyObj.sumAssured = this.policyDetail.value.sumAssured;
    this.policyObj.schemeId = this.policyDetail.value.schemeId;
    this.policyObj.customerId = this.policyDetail.value.customerId;

    this.policyService.update(this.policyObj).subscribe(res => {
      console.log(res);
      this.getAllPolicies();
    }, err => {
      console.log(err);
    });
  }

  deletePolicy(policy: Policy) {
    // Replace agentService with policyService to match the Policy entity
    this.policyService.delete(policy).subscribe(res => {
      console.log(res);
      alert('Policy Deleted Successfully');
      this.getAllPolicies();
    }, err => {
      console.log(err);
    });
  }
  currentPage = 1;
  totalCount = 0;
  policys: any;
  headers: any
  paginatedEmployees: any[] = [];
  oldEmpObj: any
  pageSizes: number[] = [5, 10, 15];

  pageSize = this.pageSizes[0];

  get() {

    this.policyService.getPolicy(this.currentPage, this.pageSize).subscribe({
      next: (response) => {

        const paginationHeader = response.headers.get('X-Pagination');
        console.log(paginationHeader);
        const paginationData = JSON.parse(paginationHeader!);
        console.log(paginationData.TotalCount);

        this.totalCount = paginationData.TotalCount;
        this.policys = response.body;
        console.log(this.policys)

        //this.updatePaginatedEmployees();

      }
    })


  }


  get pageNumbers(): number[] {
    return Array.from({ length: this.pageCount }, (_, i) => i + 1);
  }
  get pageCount(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }
  changePage(page: number) {

    this.currentPage = page;
    this.get();

  }
  calculateSRNumber(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }
  onPageSizeChange(event: Event) {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.get();
  }
  updatePaginatedEmployees() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEmployees = this.policys.slice(start, end);
  }


  fetchAgentDetails(customerId: number) {
    var agent
    if (customerId != null) {
      this.http.get<Agent>(`https://localhost:7124/api/Agent/Id?Id=${customerId}`).subscribe((data) => {
        agent = data;
        console.log(data)
        this.openAgentModal(agent)
      });
    }
    else {
      alert("Agent Id is Null")
    }
  }
  openAgentModal(customer: any) {
    const modalRef = this.modalService.open(ModalAgentComponent, { centered: true, size: 'sm' });
    modalRef.componentInstance.agent = customer;
  }




  fetchCustomerDetails(customerId: number) {
    var customer;
    this.http.get<Customer>(`https://localhost:7124/api/Customer/GetById?Id=${customerId}`).subscribe((data) => {
      customer = data;
      console.log(data);
      this.openCustomerModal(customer)

    });
  }
  openCustomerModal(customer: any) {
    const modalRef = this.modalService.open(ModalCustomerComponent, { centered: true, size: 'sm' });
    modalRef.componentInstance.customer = customer;
  }



  schemeDetail!: SchemeDetail
  getSchemeDetailById(schemeDetailId: any) {

    this.schemeDetail;
    this.scheme.getSchemeDetailById(schemeDetailId).subscribe((data: any) => {
      this.schemeDetail = data;
      console.log(this.schemeDetail)
    });
    this.openSchemeModal(this.schemeDetail)
  }
  openSchemeModal(scheme: SchemeDetail) {
    console.log(scheme)
    const modalRef = this.modalService.open(SchemeModalComponent, { centered: true, size: 'sm' });
    modalRef.componentInstance.scheme = scheme;
  }



}
