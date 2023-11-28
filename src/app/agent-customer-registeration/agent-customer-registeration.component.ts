import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateDOB, validatePassword, validatePhone } from '../helper/validateFunction';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../model/Customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-customer-registeration',
  templateUrl: './agent-customer-registeration.component.html',
  styleUrls: ['./agent-customer-registeration.component.css']
})
export class AgentCustomerRegisterationComponent {
  customerDetail !: FormGroup;
  customerObj: Customer = new Customer();
  customerList: Customer[] = [];
  constructor(private customerService: CustomerService, private router: Router, private formBuilder: FormBuilder) { }


  ngOnInit(): void {

    this.customerDetail = this.formBuilder.group({

      customerId: [''],
      customerFirstName: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z][a-zA-Z\\s]*$'),
        Validators.minLength(2) // Minimum length of 2 characters
      ]],
      customerLastName: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z][a-zA-Z\\s]*$'),
        Validators.minLength(2) // Minimum length of 2 characters
      ]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, validatePhone]],
      address: ['', [Validators.required]],
      state: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z][a-zA-Z\\s]*$'),
        Validators.minLength(2) // Minimum length of 2 characters
      ]],
      city: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z][a-zA-Z\\s]*$'),
        Validators.minLength(2) // Minimum length of 2 characters
      ]],
      userName: ['', [Validators.required]],
      passWord: ['', [Validators.required, validatePassword]],
      dob: ['', [Validators.required, validateDOB]],
      queryCount: [''],
      documentsCount: [''],
      policiesCount: [''],

    });

  }
  agentId: number = 0;
  id: number = 0;
  obj: any;
  addCustomer() {
    debugger
    const agentIdString = localStorage.getItem('agentId');
    if (agentIdString !== null) {
      this.agentId = +agentIdString; // Use the + operator to convert the string to a number
    } else {
    }
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
    this.customerObj.agentId = this.agentId;
    // this.customerObj.policiesCount = this.customerDetail.value.policiesCount;
    // this.customerObj.queryCount = this.customerDetail.value.queryCount;
    // this.customerObj.documentsCount = this.customerDetail.value.documentsCount;

    this.customerObj.status = true;

    this.customerService.addCustomer(this.customerObj).subscribe(res => {
      console.log(res);
      this.obj = res;
      if (this.obj && typeof this.obj === 'number') {
        this.id = this.obj as number; // Use type assertion to cast obj to a number
      }
      localStorage.setItem('customerId', this.id.toString());

      alert("Added Successfully")
      this.router.navigateByUrl('/agent/header');

    }, err => {
      console.log(err);
      alert("username Exist user another Andd check all field agin")

    });
  }



}
