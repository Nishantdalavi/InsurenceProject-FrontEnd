import { Component } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../model/Customer';
import { PolicyService } from '../services/policy.service';
import { AuthService } from '../services/auth.service';
import { validateDOB, validatePassword, validatePhone } from '../helper/validateFunction';
import { AgentModalComponent } from '../agent-modal/agent-modal.component';
import { AgentService } from '../services/agent.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Agent } from '../model/Agent';
import { ModalAgentComponent } from '../modal-agent/modal-agent.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.css']
})
export class CustomerDataComponent {
  title = "Welcome To Customer Api"
  customerDetail !: FormGroup;
  customerDetailUpdate !: FormGroup;
  customerObj: Customer = new Customer();
  customerList: Customer[] = [];



  currentPage = 1;
  totalCustomerCount = 0;
  customers: any;
  headers: any
  paginatedEmployees: any[] = [];
  oldEmpObj: any
  pageSizes: number[] = [5, 10, 15];

  pageSize = this.pageSizes[0];
  // addCustomer = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   emailId: new FormControl(''),
  //   mobileNo: new FormControl(''),
  //   state: new FormControl(''),
  //   city: new FormControl(''),
  //   status: new FormControl(true), // Assuming status is initially set to true
  // });

  constructor(private customerService: CustomerService, private router: Router, private formBuilder: FormBuilder,
    private auth: AuthService, private http: HttpClient
    , private agentService: AgentService, private modalService: NgbModal) { }
  ngOnInit(): void {





    this.getCustomers();
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
      agentId: [''],
      queryCount: [''],
      documentsCount: [''],
      policiesCount: [''],
      dob: ['', [Validators.required, validateDOB]],
    });

    this.customerDetailUpdate = this.formBuilder.group({
      customerId: ['', Validators.required],
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
      userId: ['', Validators.required],

      agentId: [''],
      queryCount: [''],
      documentsCount: [''],
      policiesCount: [''],
      dob: ['', [Validators.required, validateDOB]],
    });

  }

  states: string[] = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Lakshadweep',
    'Delhi',
    'Ladakh',
    'Lakshadweep',
    'Puducherry'
  ];

  getCustomers() {

    this.customerService.getCustomers(this.currentPage, this.pageSize).subscribe({
      next: (response) => {

        const paginationHeader = response.headers.get('X-Pagination');
        console.log(paginationHeader);
        const paginationData = JSON.parse(paginationHeader!);
        console.log(paginationData.TotalCount);

        this.totalCustomerCount = paginationData.TotalCount;
        this.customers = response.body;


        //this.updatePaginatedEmployees();

      }
    })


  }




  addCustomer() {

    if (this.customerDetail.valid) {
      // Your existing code for adding an employee here
      console.log(this.customerDetail);
      //  this.customerObj.customerId = this.customerDetail.value.customerId;
      this.customerObj.customerFirstName = this.customerDetail.value.customerFirstName;
      this.customerObj.customerLastName = this.customerDetail.value.customerLastName;
      this.customerObj.email = this.customerDetail.value.email;
      this.customerObj.phone = this.customerDetail.value.phone;
      this.customerObj.state = this.customerDetail.value.state;
      this.customerObj.city = this.customerDetail.value.city;
      this.customerObj.dob = this.customerDetail.value.dob;
      //   this.customerObj.agentId = this.customerDetail.value.agentId;
      this.customerObj.address = this.customerDetail.value.address;
      this.customerObj.username = this.customerDetail.value.userName;
      this.customerObj.password = this.customerDetail.value.passWord;
      // this.customerObj.policiesCount = this.customerDetail.value.policiesCount;
      // this.customerObj.queryCount = this.customerDetail.value.queryCount;
      // this.customerObj.documentsCount = this.customerDetail.value.documentsCount;

      this.customerObj.status = true;

      this.customerService.addCustomer(this.customerObj).subscribe(res => {
        console.log(res);
        alert("Added Successfully")
        this.getAllCustomer();
        window.location.reload();
      }, err => {
        console.log(err);
        this.getAllCustomer()
        window.location.reload();
      });
    } else {
      alert('Please fill in all required fields correctly.');
    }

  }

  getAllCustomer() {

    this.customerService.getAllcustomer().subscribe(res => {
      this.customerList = res;

    }
      , err => {
        console.log("data is not fecting")

      });
  }
  hideDob: boolean = false
  hideAgentId: boolean = false
  hideCustomerId: boolean = false;
  editCustomer(customer: Customer) {
    this.hideCustomerId = true
    this.hideAgentId = true
    this.hideDob = true
    this.customerDetailUpdate.controls['customerId'].setValue(customer.customerId);
    this.customerDetailUpdate.controls['customerFirstName'].setValue(customer.customerFirstName);
    this.customerDetailUpdate.controls['customerLastName'].setValue(customer.customerLastName);
    this.customerDetailUpdate.controls['email'].setValue(customer.email);
    this.customerDetailUpdate.controls['phone'].setValue(customer.phone);
    this.customerDetailUpdate.controls['address'].setValue(customer.address);
    this.customerDetailUpdate.controls['state'].setValue(customer.state);
    this.customerDetailUpdate.controls['city'].setValue(customer.city);
    this.customerDetailUpdate.controls['dob'].setValue(customer.dob);
    this.customerDetailUpdate.controls['agentId'].setValue(customer.agentId);
    this.customerDetailUpdate.controls['userId'].setValue(customer.userId);



  }
  updateCustomer() {
    if (this.customerDetailUpdate.valid) {

      // Your existing code for adding an employee here
      this.customerObj.customerId = this.customerDetailUpdate.value.customerId;
      this.customerObj.customerFirstName = this.customerDetailUpdate.value.customerFirstName;
      this.customerObj.customerLastName = this.customerDetailUpdate.value.customerLastName;
      this.customerObj.email = this.customerDetailUpdate.value.email;
      this.customerObj.phone = this.customerDetailUpdate.value.phone;
      this.customerObj.address = this.customerDetailUpdate.value.address;
      this.customerObj.state = this.customerDetailUpdate.value.state;
      this.customerObj.city = this.customerDetailUpdate.value.city;
      this.customerObj.agentId = this.customerDetailUpdate.value.agentId;
      this.customerObj.dob = this.customerDetailUpdate.value.dob;
      this.customerObj.userId = this.customerDetailUpdate.value.userId;

      this.customerService.updateCustomer(this.customerObj).subscribe(res => {
        console.log(res);
        alert("Update Successfully")

        this.getAllCustomer();
        window.location.reload()
      }, err => {

        console.log(err);
        window.location.reload()
      })
    } else {
      alert('Please fill in all required fields correctly.');
    }

  }
  deleteCustomer(customer: Customer) {
    if (window.confirm("Are you sure you want to proceed?")) {
      // User clicked "OK," so you can proceed with the action.
      // You can put your action logic here.

      this.customerService.deleteCustomer(customer).subscribe(res => {
        console.log(res);
        alert(' Status changed Sucessfully');

        window.location.reload()
      }, err => {
        alert(' Status Not changed ');
        console.log(err);
      }
      )
    } else {

    }
  }
  //-----------------------------------------------------------------
  get pageNumbers(): number[] {
    return Array.from({ length: this.pageCount }, (_, i) => i + 1);
  }
  get pageCount(): number {
    return Math.ceil(this.totalCustomerCount / this.pageSize);
  }
  changePage(page: number) {

    this.currentPage = page;
    this.getCustomers();

  }
  calculateSRNumber(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }
  onPageSizeChange(event: Event) {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.getCustomers();
  }
  updatePaginatedEmployees() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEmployees = this.customers.slice(start, end);
  }
  customerId: any = localStorage.getItem('customerId');

  getPolicyByCustomerId() {

    this.customerService.getPoliciesByCustomerId(this.customerId).subscribe(
      (data) => {

        // Handle the response data here
        console.log(data);
      },
      (error) => {
        // Handle errors here
        console.error(error);
      }
    );
  }
  searchQuery: string | number = '';

  onSearch() {
    console.log(typeof this.searchQuery)
    this.customerService.getFilter(this.currentPage, this.pageSize, this.searchQuery).subscribe({
      next: (response) => {

        const paginationHeader = response.headers.get('X-Pagination');
        console.log(paginationHeader);
        const paginationData = JSON.parse(paginationHeader!);
        console.log(paginationData.TotalCount);

        this.totalCustomerCount = paginationData.TotalCount;
        this.customers = response.body;
        //this.updatePaginatedEmployees();

      }
    })
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