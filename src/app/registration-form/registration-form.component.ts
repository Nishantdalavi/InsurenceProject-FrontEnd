import { Component, ViewChild } from '@angular/core';
import { CustomerDTO } from '../model/CustomerDto';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../model/Customer';
import { Router } from '@angular/router';
import { validateDOB, validatePassword, validatePhone } from '../helper/validateFunction';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  customerDetail !: FormGroup;
  customerObj: Customer = new Customer();
  customerList: Customer[] = [];
  constructor(private customerService: CustomerService, private router: Router, private formBuilder: FormBuilder) { }




  ngOnInit(): void {

    this.customerDetail = this.formBuilder.group({

      customerId: [''],
      customerFirstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z\\s]*$')]],
      customerLastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z\\s]*$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, validatePhone]],
      address: ['', [Validators.required]],
      state: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z\\s]*$')]],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z\\s]*$')]],
      userName: ['', [Validators.required]],
      passWord: ['', [Validators.required, validatePassword]],
      dob: ['', [Validators.required, validateDOB]],
      queryCount: [''],
      documentsCount: [''],
      policiesCount: [''],
      conformpassWord: ['', [Validators.required,validatePassword]]

    }, { Validator: this.passwordMatchValidator });


  }
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('passWord')?.value;
    const confirmPassword = group.get('conformpassWord')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  


  addCustomer() {
    if (this.customerDetail.value.conformpassWord === this.customerDetail.value.passWord) { }
    debugger
    console.log(this.customerDetail);
    //  this.customerObj.customerId = this.customerDetail.value.customerId;
    this.customerObj.customerFirstName = this.customerDetail.value.customerFirstName;
    this.customerObj.customerLastName = this.customerDetail.value.customerLastName;
    this.customerObj.email = this.customerDetail.value.email;
    this.customerObj.phone = this.customerDetail.value.phone;
    this.customerObj.state = this.customerDetail.value.state;
    this.customerObj.city = this.customerDetail.value.city;
    this.customerObj.address = this.customerDetail.value.address;
    this.customerObj.username = this.customerDetail.value.userName;

    this.customerObj.password = this.customerDetail.value.passWord;

    this.customerObj.dob = this.customerDetail.value.dob;
    // this.customerObj.policiesCount = this.customerDetail.value.policiesCount;
    // this.customerObj.queryCount = this.customerDetail.value.queryCount;
    // this.customerObj.documentsCount = this.customerDetail.value.documentsCount;

    this.customerObj.status = true;


    this.customerService.addCustomer(this.customerObj).subscribe(res => {
      console.log(res);
      alert("Added Successfully")
      this.router.navigateByUrl('/admin');

    }, err => {
      console.log(err);
      alert("username Exist user another Andd check all field agin")

    });
  }




}
