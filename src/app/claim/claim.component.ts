import { Component } from '@angular/core';
import { ClaimService } from '../services/claim.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Claim } from '../model/Claim';
import { Policy } from '../model/Policy';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ModalPolicyComponent } from '../modal-policy/modal-policy.component';
import { CustomerModalComponent } from '../customer-modal/customer-modal.component';
import { CustomerService } from '../services/customer.service';
import { ModalCustomerComponent } from '../modal-customer/modal-customer.component';
import { Customer } from '../model/Customer';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent {
  title = "Welcome To Claim API";
  claimDetail!: FormGroup;
  claimObj: Claim = new Claim();
  claimList: any = [];

  constructor(private http: HttpClient, private claimService: ClaimService, private router: Router, private formBuilder: FormBuilder, private modalService: NgbModal, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getAllClaims();
    this.claimDetail = this.formBuilder.group({
      claimId: [''],
      claimAmount: [0],
      claimDate: [new Date()],
      bankAccountNo: [''],
      bankIFSCCode: [''],
      status: [false],
      policyNo: [''],
      customerId: [''],
    });
  }

  addClaim() {

    console.log(this.claimDetail)
    this.claimObj.claimId = 0,
      this.claimObj.claimAmount = this.claimDetail.value.claimAmount,
      this.claimObj.claimDate = this.claimDetail.value.claimDate,
      this.claimObj.bankAccountNo = this.claimDetail.value.bankAccountNo,
      this.claimObj.bankIFSCCode = this.claimDetail.value.bankIFSCCode,
      this.claimObj.status = false,
      this.claimObj.policyNo = this.claimDetail.value.policyNo,
      this.claimObj.customerId = this.claimDetail.value.customerId,

      this.claimService.addClaim(this.claimObj).subscribe((res) => {
        console.log(res);
        this.getAllClaims();
        alert('Claim Added Successfully');
        window.location.reload()

      }, (err) => {
        console.log(err);
        alert('Not Added')
        window.location.reload()
      });
  }

  getAllClaims() {
    this.claimService.getClaims().subscribe(
      res => {
        console.log(res)
        this.claimList = res;

      },
      (err) => {
        console.log("Unable to fetch claim data", err);
      }
    );
  }

  editClaim(claim: Claim) {
    this.claimDetail.controls['claimId'].setValue(claim.claimId);
    this.claimDetail.controls['claimAmount'].setValue(claim.claimAmount);
    this.claimDetail.controls['claimDate'].setValue(claim.claimDate);
    this.claimDetail.controls['bankAccountNo'].setValue(claim.bankAccountNo);
    this.claimDetail.controls['bankIFSCCode'].setValue(claim.bankIFSCCode);
    this.claimDetail.controls['status'].setValue(true);
    this.claimDetail.controls['policyNo'].setValue(claim.policyNo);
    this.claimDetail.controls['customerId'].setValue(claim.customerId);
    this.updateClaim()
  }

  updateClaim() {
    this.claimObj.claimId = this.claimDetail.value.claimId;
    this.claimObj.claimAmount = this.claimDetail.value.claimAmount;
    this.claimObj.claimDate = this.claimDetail.value.claimDate;
    this.claimObj.bankAccountNo = this.claimDetail.value.bankAccountNo;
    this.claimObj.bankIFSCCode = this.claimDetail.value.bankIFSCCode;
    this.claimObj.status = true;
    this.claimObj.policyNo = this.claimDetail.value.policyNo;
    this.claimObj.customerId = this.claimDetail.value.customerId;

    this.claimService.updateClaim(this.claimObj).subscribe(res => {
      console.log(res);
      alert('Claim Updated Successfully');
      window.location.reload()

    }, err => {
      console.log(err);
      alert(err)
      window.location.reload()
    });
  }

  deleteClaim(claim: Claim) {
    this.claimService.deleteClaim(claim.claimId).subscribe(res => {
      console.log(res);
      alert('Claim Denined');
      window.location.reload()
    }, err => {
      console.log(err);
      alert("not Deleted")
      window.location.reload()
    });
  }
  policy: any
  fetchPolicyDetails(customerId: number) {

    this.http.get<Policy>(`https://localhost:7124/api/Policy/GetById?Id=${customerId}`).subscribe((data) => {
      this.policy = data;
      console.log(data);
      this.openPolicyModal(this.policy)


    });
  }
  openPolicyModal(customer: any) {
    const modalRef = this.modalService.open(ModalPolicyComponent, { centered: true, size: 'sm' });
    modalRef.componentInstance.policy = customer;
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


}
