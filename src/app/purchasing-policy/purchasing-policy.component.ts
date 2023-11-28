import { Component } from '@angular/core';
import { Payment } from '../model/Payment';
import { Nominee } from '../model/Nominee';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { NomineeDTO } from '../model/NomineeDTO';
import { PaymentDTO } from '../model/PaymentDTO';
import { Policy } from '../model/Policy';
import { MatDialog } from '@angular/material/dialog';
import { PaymentReciptComponent } from '../payment-recipt/payment-recipt.component';
import { SchemeDetailService } from '../services/scheme-detail.service';

@Component({
  selector: 'app-purchasing-policy',
  templateUrl: './purchasing-policy.component.html',
  styleUrls: ['./purchasing-policy.component.css']
})
export class PurchasingPolicyComponent {
  policy!: Policy
  tax: any
  NomineeForm!: FormGroup
  selectedMode: string = 'Card';
  constructor(private customer: CustomerService, private dialog: MatDialog, private scheme: SchemeDetailService) {
  }

  ngOnInit() {
    this.getTax()
    this.NomineeForm = new FormGroup(
      {
        card: new FormControl('', [Validators.required]),
        nomineeName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z\\s]*$')]),
        relation: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z\\s]*$')])
      }
    );
    this.policy = this.customer.getPolicy();

    console.log(this.policy) // Do something with the policy data
  }


  getTax() {

    this.customer.getTaxPercent().subscribe({
      next: (res) => {
        this.tax = res;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }
  calculateTax(amount: number) {

    if (this.tax != null) {
      const taxAmount = (amount * this.tax.taxPercent) / 100;
      return Math.round(taxAmount * 100) / 100;
    }
    else {
      return 0
    }
  }
  AddNominee() {
    this.isAddButtonDisabled = false; // Enable the second button after nominee is added
    this.isNomineeAdded = true;
    // Rest of your AddNominee logic here
    this.policy.NomineeDTO = new NomineeDTO();
    this.policy.NomineeDTO.nomineeName = this.NomineeForm.get('nomineeName')?.value
    this.policy.NomineeDTO.relation = this.NomineeForm.get('relation')?.value


  }
  schemeProfitPercent!: any;
  getProfitPercent() {
    this.scheme.getSchemeDetailById(this.policy.schemeId).subscribe({
      next: (res) => {

        this.schemeProfitPercent = res
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }


  FillPayment() {
    this.policy.PaymentDTO = new PaymentDTO()
    this.policy.PaymentDTO.amount = this.policy.premium;
    this.policy.PaymentDTO.paymentDate = new Date();
    this.policy.PaymentDTO.paymentType = this.selectedMode;
    this.policy.PaymentDTO.tax = this.calculateTax(this.policy.premium)
    this.policy.PaymentDTO.totalPayment = this.policy.premium + this.policy.PaymentDTO.tax
    this.policy.PaymentDTO.customerId = this.policy.customerId;
    this.policy.PaymentDTO.cardNumber = this.policy.PaymentDTO.cardNumber;
    this.policy.PaymentDTO.cvv = this.policy.PaymentDTO.cardNumber
  }
  pay() {
    this.getProfitPercent()
    // Calculate profit amount
    const profitAmount = (this.schemeProfitPercent.profitPercent / 100) * this.policy.sumAssured;

    // Calculate new total amount
    const newTotalAmount = this.policy.sumAssured + profitAmount;

    this.policy.sumAssured = newTotalAmount
    // console.log(this.policy.sumAssured=this.policy.premium)
    this.customer.purchasePolicy(this.policy).subscribe({
      next: (res) => {
        console.log(res)
        alert('payment successfull ')
        this.dialog.open(PaymentReciptComponent, {
          data: this.policy.PaymentDTO // Pass payment data to the dialog
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
      }
    })

  }

  updateMode(selectedMode: string) {
    if (this.policy.PaymentDTO) {
      this.policy.PaymentDTO.paymentType = selectedMode;
    }
  }
  showNomineeFields: boolean = false;
  isNomineeAdded: boolean = false;
  isAddButtonDisabled: boolean = false;

  toggleNomineeFields() {
    this.showNomineeFields = true;
    this.isAddButtonDisabled = false; // Enable the second button
  }

  toggleAddButton() {
    this.isAddButtonDisabled = true; // Disable the second button
  }





}
