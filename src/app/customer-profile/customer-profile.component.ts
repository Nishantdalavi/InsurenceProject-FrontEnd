import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent {
  customerId: number;
  customerFirstName: string;
  customerLastName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  city: string;
  userId: number;
  dob: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService, // Update with your Customer service
    private dialogRef: MatDialogRef<CustomerProfileComponent>
  ) {
    this.customerId = data.customerId;
    this.customerFirstName = data.customerFirstName;
    this.customerLastName = data.customerLastName;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
    this.state = data.state;
    this.city = data.city;
    this.userId = data.userId;
    this.dob = data.dob;

    localStorage.setItem('customerId', data.customerId);
    localStorage.setItem('userId', data.userId);


  }

  onSubmit() {
    // Create an object with the modified data
    const customerData = {
      customerId: this.customerId,
      customerFirstName: this.customerFirstName,
      customerLastName: this.customerLastName,
      email: this.email,
      phone: this.phone,
      address: this.address,
      state: this.state,
      city: this.city,
      userId: this.userId,
      dob: this.dob
    };

    // Call the API service to update the customer data
    this.customerService.updateCustomer(customerData).subscribe(
      (updatedCustomerId) => {
        alert("Updated Successfully");
        console.log('Customer updated successfully.');
        this.dialogRef.close(updatedCustomerId);
      },
      (error) => {
        alert("Some issue. Please try again later.");
        console.error('Error updating customer:', error);
      }
    );
  }
}
