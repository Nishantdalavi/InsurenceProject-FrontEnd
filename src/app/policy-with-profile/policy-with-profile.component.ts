import { Component } from '@angular/core';
import { PolicyService } from '../services/policy.service';
import { CustomerService } from '../services/customer.service';
import { SchemeDetailService } from '../services/scheme-detail.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerModalComponent } from '../customer-modal/customer-modal.component';
import { SchemeModalComponent } from '../scheme-modal/scheme-modal.component';

@Component({
  selector: 'app-policy-with-profile',
  templateUrl: './policy-with-profile.component.html',
  styleUrls: ['./policy-with-profile.component.css']
})
export class PolicyWithProfileComponent {
  policies: any[] = [];
  customers: any;
  schemeDetail: any;

  constructor(private policyService: PolicyService, private customerService: CustomerService, private scheme: SchemeDetailService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

    this.getPolicies();
  }

  getPolicies(): void {
    this.policyService.get().subscribe((policies: any[]) => {
      this.policies = policies;
    });
  }

  getCustomerById(customerId: any) {

    this.customerService.getCustomerById(customerId).subscribe((data: any) => {
      this.customers = data;
      console.log(this.customers)
      this.openCustomerModal(this.customers)
    });
  } openCustomerModal(customer: any) {
    const modalRef = this.modalService.open(CustomerModalComponent, { centered: true, size: 'sm' });
    modalRef.componentInstance.customer = customer;
  }


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
}

