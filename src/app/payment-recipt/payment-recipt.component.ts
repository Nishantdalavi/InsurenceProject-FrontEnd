import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from '../services/customer.service';
import { PolicyService } from '../services/policy.service';

@Component({
  selector: 'app-payment-recipt',
  templateUrl: './payment-recipt.component.html',
  styleUrls: ['./payment-recipt.component.css']
})
export class PaymentReciptComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private customer: CustomerService, private policy: PolicyService) { }
  ngOnInit(): void {
    this.getCustomerById()
    this.getPolicyById()
    this.generateInvoiceId()
  }
  printReceipt() {
    window.print();
  }

  downloadReceipt() {
    const paymentReceiptElement = document.getElementById('paymentReceipt');

    if (paymentReceiptElement) {
      const receiptContent = paymentReceiptElement.innerHTML;
      const blob = new Blob([receiptContent], { type: 'application/pdf' });

      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = 'payment_receipt.pdf';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      console.error('Element with ID "paymentReceipt" not found');
    }
  }
  customerDetails: any
  getCustomerById() {

    this.customer.getCustomerById(this.data.customerId).subscribe(
      (data) => {
        this.customerDetails = data
        // Handle the response data here
        console.log(data);
      },
      (error) => {
        // Handle errors here
        console.error(error);
      }
    );
  }
  policyDetails: any
  getPolicyById() {

    this.policy.getPolicyById(this.data.policyNo).subscribe(
      (data: any) => {
        this.policyDetails = data
        // Handle the response data here
        console.log(data);
      },
      (error: any) => {
        // Handle errors here
        console.error(error);
      }
    );
  }
  private idCounter = 0;
  invoiceId!: string;

  generateInvoiceId() {

    // Generate a unique ID by incrementing a counter
    this.invoiceId = `INV-${this.idCounter++}`;
  }
}
