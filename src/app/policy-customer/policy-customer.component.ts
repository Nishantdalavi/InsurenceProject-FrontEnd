import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Policy } from '../model/Policy';
import { PolicyService } from '../services/policy.service';
import { Router } from '@angular/router';
import { InsuranceScheme } from '../model/InsuranceScheme';
import { SchemeDetail } from '../model/SchemeDetail';
import { Agent } from '../model/Agent';
import { SchemeModalComponent } from '../scheme-modal/scheme-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SchemeDetailService } from '../services/scheme-detail.service';
import { CustomerService } from '../services/customer.service';
import { AgentService } from '../services/agent.service';
import { AgentModalComponent } from '../agent-modal/agent-modal.component';
import { HttpClient } from '@angular/common/http';
import { ModalAgentComponent } from '../modal-agent/modal-agent.component';

@Component({
  selector: 'app-policy-customer',
  templateUrl: './policy-customer.component.html',
  styleUrls: ['./policy-customer.component.css']
})
export class PolicyCustomerComponent {
  title = "Welcome To Policy API";
  policyDetail!: FormGroup;
  policyObj: Policy = new Policy();
  policyList: any = [];

  constructor(private http: HttpClient
    , private policyService: PolicyService, private router: Router, private formBuilder: FormBuilder,
    private modalService: NgbModal, private scheme: SchemeDetailService, private agentService: AgentService) { }

  ngOnInit(): void {
    this.getAllPolicies();
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

    });
  }
  addPolicy() {
    var policy: Policy = {

      issueDate: this.policyDetail.value.issueDate,
      maturityDate: this.policyDetail.value.maturityDate,
      premium: this.policyDetail.value.premium,
      sumAssured: this.policyDetail.value.sumAssured,
      schemeId: this.policyDetail.value.schemeId,
      customerId: this.policyDetail.value.customerId,
      agentId: this.policyDetail.value.agentId,
      status: this.policyDetail.value.status,
      policyNo: this.policyDetail.value.policyNo,
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
  customerId: number = 0;
  getAllPolicies() {
    const customerIdString = localStorage.getItem('customerId');
    if (customerIdString !== null) {
      this.customerId = +customerIdString; // Use the + operator to convert the string to a number
    } else {
    }
    this.policyService.getPoliciesByCustomerId(this.customerId).subscribe(
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
  viewPolicy(policy: any) {

    this.router.navigateByUrl('/installment/' + policy);
  }

  schemeDetail: any
  getSchemeDetailById(schemeDetailId: any) {
    this.scheme.getSchemeDetailById(schemeDetailId).subscribe((data: any) => {
      this.schemeDetail = data;
      console.log(this.schemeDetail)
    });
    this.openSchemeModal(this.schemeDetail)
  }

  openSchemeModal(scheme: any) {
    const modalRef = this.modalService.open(SchemeModalComponent, { centered: true, size: 'sm' });
    modalRef.componentInstance.scheme = scheme;
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

}
