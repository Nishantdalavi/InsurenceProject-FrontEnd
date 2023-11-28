import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../services/admin.service';
import { Payment } from '../model/Payment';
import { PaymentService } from '../services/payment.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentDTO } from '../model/PaymentDTO';
import { Claim } from '../model/Claim';
import { ClaimService } from '../services/claim.service';
import { PaymentReciptComponent } from '../payment-recipt/payment-recipt.component';
import { MatDialog } from '@angular/material/dialog';
declare var window: any


@Component({
  selector: 'app-installment-policies',
  templateUrl: './installment-policies.component.html',
  styleUrls: ['./installment-policies.component.css']
})
export class InstallmentPoliciesComponent {


  policyNo!: number
  policy: any
  Tax: any = {}
  customerData: any
  schemeData: any
  installment: { number: number, isPaid: boolean }[] = [{ number: 1, isPaid: true }]
  paymentModal: any
  claimModal: any
  numberOfInstallments!: number
  PaymentForm!: FormGroup
  ClaimForm!: FormGroup
  installmentNo!: number
  constructor(private dialog: MatDialog, private activatedroute: ActivatedRoute, private customer: CustomerService, private fb: FormBuilder, private router: Router) { }
  ngOnInit() {

    this.policyNo = (Number)(this.activatedroute.snapshot.paramMap.get('id'));
    this.getPolicyData();
    this.getTax();
    this.paymentModal = new window.bootstrap.Modal(document.getElementById("emiPaymentModal"));


    this.PaymentForm = this.fb.group({
      payType: ['null', [Validators.required]],
      cHolderName: ['', [Validators.required]],
      cNumber: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
      DateOfExpiry: ['', [Validators.required]],

    });
    this.ClaimForm = this.fb.group({
      accNo: ['', [Validators.required]],
      ifsc: ['', [Validators.required]],

    });

  }
  openModal(modal: any) {
    modal.show();
  }
  closeModal(modal: any) {
    modal.hide();
  }

  getPolicyData() {

    this.customer.getPolicyDetail(this.policyNo).subscribe(
      (res) => {
        this.policy = res;
        console.log(this.policy)

        this.numberOfInstallments = this.policy.totalPremiumNo
        this.installment = Array.from(
          { length: this.policy.totalPremiumNo },
          (_, i) => ({ number: i + 1, isPaid: false })
        );
        this.getCustomerDetail();
        this.getSchemeData();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    )
  }
  getCustomerDetail() {
    this.customer.getCustomerById(this.policy.customerId).subscribe((res) => {
      this.customerData = res
      console.log(this.customerData)
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      })
  }
  getSchemeData() {
    this.customer.getSchemeById(this.policy.schemeId).subscribe(
      (res) => {
        this.schemeData = res

      },
      (err: HttpErrorResponse) => {
        console.log(err)
      }
    )
  }
  getTax() {
    this.customer.getTaxPercent().subscribe({
      next: (res) => {
        this.Tax = res;
        console.log(res)
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    })
  }
  calculateTotalAmoutToPay() {
    return (((this.policy.premium * this.Tax.taxPercent) / 100) + this.policy.premium)
  }
  calculateDueDate(emi: number) {

    let issueDate = this.policy.issueDate;
    let emiMode: number = this.policy.premiumMode;
    const parsedIssueDate = new Date(issueDate);
    const dueDate = new Date(parsedIssueDate);

    if (emiMode == (3)) {
      dueDate.setMonth(dueDate.getMonth() + (1 * emi));
    } else if (emiMode == 2) {
      dueDate.setMonth(dueDate.getMonth() + (3 * emi));
    } else if (emiMode == 1) {
      dueDate.setMonth(dueDate.getMonth() + (6 * emi));
    }
    else {
      dueDate.setMonth(dueDate.getMonth() + (12 * emi));
    }

    return dueDate;

  }
  showPaymentModal(index: any) {
    this.installmentNo = index
    this.openModal(this.paymentModal)
  }
  PayPremium() {


    let payment = new PaymentDTO();
    payment.amount = this.policy.premium,
      payment.totalPayment = this.calculateTotalAmoutToPay(),
      payment.cvv = String(this.PaymentForm.get('cvv')?.value!),
      //   payment.cardHolderName = this.PaymentForm.get('cHolderName')?.value!,
      payment.cardNumber = String(this.PaymentForm.get('cNumber')?.value!),
      //   payment.expiryDate = this.PaymentForm.get('DateOfExpiry')?.value!,
      payment.customerId = this.policy.customerId
    payment.paymentType = "Credit Card"
    payment.tax = (this.policy.premium * this.Tax.taxPercent) * 0.01
    payment.policyNo = this.policy.policyNo
    console.log(payment)
    this.customer.makePayment(payment).subscribe({
      next: (res) => {
        alert("Paid Successfully");
        this.installment[this.installmentNo].isPaid = true;
        this.closeModal(this.paymentModal);
        this.dialog.open(PaymentReciptComponent, {
          data: this.policy.PaymentDTO // Pass payment data to the dialog
        });

      },
      error: (err: HttpErrorResponse) => {
        alert("Something went wrong");
        console.log(err)
        this.closeModal(this.paymentModal);
      }
    })

  }
  downloadReceipt(index: number) {
    console.log(index)
    console.log(this.policy.payments[index])
    this.router.navigateByUrl("/payment/receipt/" + this.policy.payments[index].paymentId)

  }
  claim() {
    this.claimModal = new window.bootstrap.Modal(document.getElementById("claimPolicyModal"));
    this.openModal(this.claimModal);
  }
  claimPolicy() {


    // "claimAmount": 0,


    console.log(this.ClaimForm.value)
    let claim = new Claim();
    claim.bankAccountNo = "XXXXXXXX1234"
    claim.bankIFSCCode = "CVV"
    claim.claimAmount = this.policy.sumAssured
    claim.policyNo = this.policy.policyNo
    claim.customerId = this.policy.customerId

    this.customer.registerClaim(claim).subscribe({
      next: (res) => {
        alert("Addedd successfully")
        console.log(res);
        this.closeModal(this.claimModal)
        location.reload()
      },
      error: (err: HttpErrorResponse) => {
        alert("Something went wrong");
        this.closeModal(this.claimModal)
      }
    })
  }

}
