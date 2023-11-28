import { Component } from '@angular/core';
import { Employee } from '../model/Employee';
import { EmployeeService } from '../services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validateEmail, validateNonNegativeNumber, validatePassword, validatePhone } from '../helper/validateFunction';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.css']
})
export class EmployeeDataComponent {
  title = "Welcome to Employee Api"
  employeeDetail !: FormGroup;
  employeeDetailUpdate!: FormGroup;
  employeeObj: Employee = new Employee();
  employeeList: Employee[] = [];




  constructor(private employeeService: EmployeeService, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.get();
    this.employeeDetail = this.formBuilder.group({
      employeeId: [''],
      employeeFirstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      employeeLastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, validateEmail]],
      phone: ['', [Validators.required, validatePhone]],
      salary: ['', [Validators.required, validateNonNegativeNumber, Validators.min(0)]],
      username: ['', Validators.required],
      password: ['', [Validators.required, validatePassword]],
    });
    this.employeeDetailUpdate = this.formBuilder.group({
      employeeId: [''],
      employeeFirstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      employeeLastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, validateEmail]],
      phone: ['', [Validators.required, validatePhone]],
      salary: ['', [Validators.required, validateNonNegativeNumber, Validators.min(0)]],
      userId: ['', Validators.required]



    });

  }




  addEmployee() {

    if (this.employeeDetail.valid) {
      // Your existing code for adding an agent here
      console.log(this.employeeDetail);
      // this.employeeObj.employeeeId = this.employeeDetail.value.employeeeId;
      this.employeeObj.employeeFirstName = this.employeeDetail.value.employeeFirstName;
      this.employeeObj.employeeLastName = this.employeeDetail.value.employeeLastName;
      this.employeeObj.email = this.employeeDetail.value.email;
      this.employeeObj.phone = this.employeeDetail.value.phone;
      this.employeeObj.username = this.employeeDetail.value.username;
      this.employeeObj.password = this.employeeDetail.value.password;
      this.employeeObj.salary = this.employeeDetail.value.salary;
      // this.employeeObj.status = this.employeeDetail.value.status;
      // this.customerObj.policiesCount = this.customerDetail.value.policiesCount;
      // this.customerObj.queryCount = this.customerDetail.value.queryCount;
      // this.customerObj.documentsCount = this.customerDetail.value.documentsCount;

      this.employeeObj.status = true;

      this.employeeService.addEmployee(this.employeeObj).subscribe(res => {
        console.log(res);

        alert("Data Added Successfully")
        window.location.reload()
        this.getAllEmployee();
      }, err => {

        console.log(err);
        window.location.reload()

      });
    } else {
      alert('Please fill in all required fields correctly.');
    }

  }

  getAllEmployee() {

    this.employeeService.getAllemployee().subscribe(res => {
      this.employeeList = res;
    }
      , err => {
        console.log("data is not fecting")

      });
  }


  editEmployee(employee: Employee) {
    console.log("Edit Emp");
    this.employeeDetailUpdate.controls['employeeId'].setValue(employee.employeeId);
    this.employeeDetailUpdate.controls['employeeFirstName'].setValue(employee.employeeFirstName);
    this.employeeDetailUpdate.controls['employeeLastName'].setValue(employee.employeeLastName);
    this.employeeDetailUpdate.controls['email'].setValue(employee.email);
    this.employeeDetailUpdate.controls['phone'].setValue(employee.phone);
    this.employeeDetailUpdate.controls['salary'].setValue(employee.salary);
    this.employeeDetailUpdate.controls['userId'].setValue(employee.userId);

    //  this.employeeDetail.controls['status'].setValue(employee.status);
    // this.customerDetail.controls['username'].setValue(customer.username);
    // this.customerDetail.controls['password'].setValue(customer.password);

  }
  updateEmployee() {

    if (this.employeeDetailUpdate.valid) {
      // Your existing code for adding an agent here
      this.employeeObj.employeeId = this.employeeDetailUpdate.value.employeeId;
      this.employeeObj.employeeFirstName = this.employeeDetailUpdate.value.employeeFirstName;
      this.employeeObj.employeeLastName = this.employeeDetailUpdate.value.employeeLastName;
      this.employeeObj.email = this.employeeDetailUpdate.value.email;
      this.employeeObj.phone = this.employeeDetailUpdate.value.phone;
      this.employeeObj.salary = this.employeeDetailUpdate.value.salary;
      this.employeeObj.userId = this.employeeDetailUpdate.value.userId;
      this.employeeObj.status = true;


      this.employeeService.updateEmployee(this.employeeObj).subscribe(res => {
        console.log(res);

        alert("Updation successfull")
        window.location.reload()

      }, err => {

        console.log(err);
        window.location.reload()
      })
    } else {
      alert('Please fill in all required fields correctly.');
    }

  }
  deleteEmployee(employee: Employee) {

    if (window.confirm("Are you sure you want to proceed?")) {

      this.employeeService.deleteEmployee(employee).subscribe(res => {
        console.log(res);

        alert(' employee Deleted Sucessfully');
        window.location.reload()

      }, err => {

        console.log(err);
        window.location.reload()
      }
      )
    } else {
      // User clicked "Cancel" or closed the dialog, so you can handle the cancel action here.
      // For example, you can go back or do nothing.

    }
  }


  currentPage = 1;
  totalCount = 0;
  employees: any;
  headers: any
  paginatedEmployees: any[] = [];
  oldEmpObj: any
  pageSizes: number[] = [5, 10, 15];

  pageSize = this.pageSizes[0];

  get() {

    this.employeeService.getEmployee(this.currentPage, this.pageSize).subscribe({
      next: (response) => {

        const paginationHeader = response.headers.get('X-Pagination');
        console.log(paginationHeader);
        const paginationData = JSON.parse(paginationHeader!);
        console.log(paginationData.TotalCount);

        this.totalCount = paginationData.TotalCount;
        this.employees = response.body;


        //this.updatePaginatedEmployees();

      }
    })


  }


  get pageNumbers(): number[] {
    return Array.from({ length: this.pageCount }, (_, i) => i + 1);
  }
  get pageCount(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }
  changePage(page: number) {

    this.currentPage = page;
    this.get();

  }
  calculateSRNumber(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }
  onPageSizeChange(event: Event) {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.get();
  }
  updatePaginatedEmployees() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEmployees = this.employees.slice(start, end);
  }

  searchQuery: string | number = '';

  onSearch() {
    console.log(typeof this.searchQuery)
    this.employeeService.getFilterEmployees(this.currentPage, this.pageSize, this.searchQuery).subscribe({
      next: (response) => {

        const paginationHeader = response.headers.get('X-Pagination');
        console.log(paginationHeader);
        const paginationData = JSON.parse(paginationHeader!);
        console.log(paginationData.TotalCount);

        this.totalCount = paginationData.TotalCount;
        this.employees = response.body;
        //this.updatePaginatedEmployees();

      }
    })
  }
  hideEmployeeId: boolean = true

}