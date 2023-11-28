import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from '../model/Customer';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-customer-agent',
  templateUrl: './customer-agent.component.html',
  styleUrls: ['./customer-agent.component.css']
})
export class CustomerAgentComponent {
  customerDetail !: FormGroup;
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
    private auth: AuthService) { }
  ngOnInit(): void {
    this.getAllCustomer();
    this.customerDetail = this.formBuilder.group({

      customerId: [''],
      customerFirstName: [''],
      customerLastName: [''],
      email: [''],
      phone: [''],
      address: [''],
      state: [''],
      city: [''],
      userName: [''],
      passWord: [''],
      agentId: [''],
      queryCount: [''],
      documentsCount: [''],
      policiesCount: ['']

    });

  }
  getCustomers() {

    this.customerService.getCustomers(this.currentPage, this.pageSize).subscribe({
      next: (response) => {

        const paginationHeader = response.headers.get('X-Pagination');
        console.log(paginationHeader);
        const paginationData = JSON.parse(paginationHeader!);
        console.log(paginationData.TotalCount);

        this.totalCustomerCount = paginationData.TotalCount;
        this.customers = response.body;
        console.log(this.customers)

        //this.updatePaginatedEmployees();

      }
    })


  }




  addCustomer() {

    console.log(this.customerDetail);
    //  this.customerObj.customerId = this.customerDetail.value.customerId;
    this.customerObj.customerFirstName = this.customerDetail.value.customerFirstName;
    this.customerObj.customerLastName = this.customerDetail.value.customerLastName;
    this.customerObj.email = this.customerDetail.value.email;
    this.customerObj.phone = this.customerDetail.value.phone;
    this.customerObj.state = this.customerDetail.value.state;
    this.customerObj.city = this.customerDetail.value.city;
    this.customerObj.agentId = this.agentId;
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
  }
  agentId: number = 0
  getAllCustomer() {
    const agentIdString = localStorage.getItem('agentId');
    if (agentIdString !== null) {
      this.agentId = +agentIdString; // Use the + operator to convert the string to a number
    } else {
    }
    this.customerService.getCustomersByAgentId(this.agentId).subscribe(res => {
      this.customerList = res;

    }
      , err => {
        console.log("data is not fecting")

      });
  }


  editCustomer(customer: Customer) {
    this.customerDetail.controls['customerId'].setValue(customer.customerId);
    this.customerDetail.controls['customerFirstName'].setValue(customer.customerFirstName);
    this.customerDetail.controls['customerLastName'].setValue(customer.customerLastName);
    this.customerDetail.controls['email'].setValue(customer.email);
    this.customerDetail.controls['phone'].setValue(customer.phone);
    this.customerDetail.controls['address'].setValue(customer.address);
    this.customerDetail.controls['state'].setValue(customer.state);
    this.customerDetail.controls['city'].setValue(customer.city);
    // this.customerDetail.controls['username'].setValue(customer.username);
    // this.customerDetail.controls['password'].setValue(customer.password);
    this.customerDetail.controls['agentId'].setValue(this.agentId);


  }
  updateCustomer() {

    this.customerObj.customerId = this.customerDetail.value.customerId;
    this.customerObj.customerFirstName = this.customerDetail.value.customerFirstName;
    this.customerObj.customerLastName = this.customerDetail.value.customerLastName;
    this.customerObj.email = this.customerDetail.value.email;
    this.customerObj.phone = this.customerDetail.value.phone;
    this.customerObj.address = this.customerDetail.value.address;
    this.customerObj.state = this.customerDetail.value.state;
    this.customerObj.city = this.customerDetail.value.city;
    this.customerObj.agentId = this.agentId;
    this.customerService.updateCustomer(this.customerObj).subscribe(res => {
      console.log(res);
      alert("Update Successfully")

      this.getAllCustomer();

    }, err => {

      console.log(err);
    })
  }
  deleteCustomer(customer: Customer) {
    this.customerService.deleteCustomer(customer).subscribe(res => {
      console.log(res);
      alert(' customer Deleted Sucessfully');

      this.getAllCustomer();
    }, err => {
      console.log(err);
    }
    )
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



}
