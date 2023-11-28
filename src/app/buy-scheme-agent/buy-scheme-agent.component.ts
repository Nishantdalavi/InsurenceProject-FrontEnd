import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { Policy } from '../model/Policy';
import { PaymentDTO } from '../model/PaymentDTO';
import { NomineeDTO } from '../model/NomineeDTO';
import { PaymentReciptComponent } from '../payment-recipt/payment-recipt.component';

@Component({
  selector: 'app-buy-scheme-agent',
  templateUrl: './buy-scheme-agent.component.html',
  styleUrls: ['./buy-scheme-agent.component.css']
})
export class BuySchemeAgentComponent {
  policy!: Policy
  tax: any
  NomineeForm!: FormGroup
  constructor(private customer: CustomerService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getTax()
    this.NomineeForm = new FormGroup(
      {
        nomineeName: new FormControl(''),
        relation: new FormControl('')
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
  isNomineeAdded = false
  AddNominee() {
    this.isAddButtonDisabled = false; // Enable the second button after nominee is added
    this.isNomineeAdded = true;
    this.policy.NomineeDTO = new NomineeDTO();
    this.policy.NomineeDTO.nomineeName = this.NomineeForm.get('nomineeName')?.value
    this.policy.NomineeDTO.relation = this.NomineeForm.get('relation')?.value

  }
  agentId: number = 0;
  FillPayment() {
    this.policy.PaymentDTO = new PaymentDTO()
    this.policy.PaymentDTO.amount = this.policy.premium;
    this.policy.PaymentDTO.paymentDate = new Date();
    this.policy.PaymentDTO.paymentType = 'card';
    this.policy.PaymentDTO.tax = this.calculateTax(this.policy.premium)
    this.policy.PaymentDTO.totalPayment = this.policy.premium + this.policy.PaymentDTO.tax
    this.policy.PaymentDTO.customerId = this.policy.customerId;
    const agentIdString = localStorage.getItem('agentId');
    if (agentIdString !== null) {
      this.agentId = +agentIdString; // Use the + operator to convert the string to a number
    } else {
    }
    this.policy.agentId = this.agentId;
  }
  pay() {

    console.log(this.policy)
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
        alert('errorr while payment')
      }
    })

  }
  showNomineeFields: boolean = true
  isAddButtonDisabled: boolean = false
  toggleNomineeFields() {
    this.showNomineeFields = true;
    this.isAddButtonDisabled = false; // Enable the second button
  }

  toggleAddButton() {
    this.isAddButtonDisabled = true; // Disable the second button
  }
}
