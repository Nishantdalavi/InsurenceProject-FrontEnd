import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agent } from '../model/Agent';
import { AgentService } from '../services/agent.service';
import { Router } from '@angular/router';
import { validateEmail, validatePassword, validatePhone } from '../helper/validateFunction';

@Component({
  selector: 'app-agent-data',
  templateUrl: './agent-data.component.html',
  styleUrls: ['./agent-data.component.css']
})
export class AgentDataComponent {
  title = "Welcome To Agent Api"
  agentDetail !: FormGroup;
  agentDetailUpdate !: FormGroup;
  agentObj: Agent = new Agent();
  agentList: Agent[] = [];

  constructor(private agentService: AgentService, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.get();

    this.agentDetail = this.formBuilder.group({
      agentId: [''],
      agentFirstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      agentLastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      qualification: ['', Validators.required],
      email: ['', [Validators.required, validateEmail]],
      phone: ['', [Validators.required, validatePhone]],
      username: ['', Validators.required],
      password: ['', [Validators.required, validatePassword]],
      userId: ['']

    });
    this.agentDetailUpdate = this.formBuilder.group({
      agentId: ['', Validators.required],
      agentFirstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      agentLastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      qualification: ['', Validators.required],
      email: ['', [Validators.required, validateEmail]],
      phone: ['', [Validators.required, validatePhone]],

      userId: ['', Validators.required]

    });


  }




  addAgent() {

    if (this.agentDetail.valid) {
      // Your existing code for adding an agent here
      console.log(this.agentDetail);
      this.agentObj.agentId = this.agentDetail.value.agentId;
      this.agentObj.agentFirstName = this.agentDetail.value.agentFirstName;
      this.agentObj.agentLastName = this.agentDetail.value.agentLastName;
      this.agentObj.qualification = this.agentDetail.value.qualification;
      this.agentObj.email = this.agentDetail.value.email;
      this.agentObj.phone = this.agentDetail.value.phone;
      this.agentObj.username = this.agentDetail.value.username;
      this.agentObj.password = this.agentDetail.value.password;
      // this.customerObj.policiesCount = this.customerDetail.value.policiesCount;
      // this.customerObj.queryCount = this.customerDetail.value.queryCount;
      // this.customerObj.documentsCount = this.customerDetail.value.documentsCount;

      this.agentObj.status = true;

      this.agentService.addAgent(this.agentObj).subscribe(res => {
        console.log(res);
        this.getAllAgent();
        window.location.reload()
      }, err => {

        alert("Username already Exist")

        console.log(err);
        window.location.reload()

      });
    } else {
      alert('Please fill in all required fields correctly.');
    }


  }

  getAllAgent() {
    this.agentService.getAllagent().subscribe(res => {
      this.agentList = res;
    }
      , err => {
        console.log("unable to fetch data")

      });
  }

  hideAgentId: boolean = false
  hideUserId: boolean = false
  editAgent(agent: Agent) {
    this.hideAgentId = true
    this.hideUserId = true
    this.agentDetailUpdate.controls['agentId'].setValue(agent.agentId);
    this.agentDetailUpdate.controls['agentFirstName'].setValue(agent.agentFirstName);
    this.agentDetailUpdate.controls['agentLastName'].setValue(agent.agentLastName);
    this.agentDetailUpdate.controls['qualification'].setValue(agent.qualification);
    this.agentDetailUpdate.controls['email'].setValue(agent.email);
    this.agentDetailUpdate.controls['phone'].setValue(agent.phone);
    this.agentDetailUpdate.controls['userId'].setValue(agent.userId);

    // this.customerDetail.controls['username'].setValue(customer.username);
    // this.customerDetail.controls['password'].setValue(customer.password);


  }
  updateAgent() {

    if (this.agentDetailUpdate.valid) {
      // Your existing code for updating an agent here

      this.agentObj.agentId = this.agentDetailUpdate.value.agentId;
      this.agentObj.agentFirstName = this.agentDetailUpdate.value.agentFirstName;
      this.agentObj.agentLastName = this.agentDetailUpdate.value.agentLastName;
      this.agentObj.qualification = this.agentDetailUpdate.value.qualification;
      this.agentObj.email = this.agentDetailUpdate.value.email;
      this.agentObj.phone = this.agentDetailUpdate.value.phone;
      this.agentObj.userId = this.agentDetailUpdate.value.userId;
      this.agentService.updateAgent(this.agentObj).subscribe(res => {
        console.log(res);
        alert("Updated successfully")
        window.location.reload()
        this.getAllAgent();
      }, err => {
        alert("Error")
        window.location.reload()
        console.log(err);
      })
    } else {
      alert('Please fill in all required fields correctly.');
    }


  }
  deleteAgent(agent: Agent) {
    if (window.confirm("Are you sure you want to proceed?")) {
      // User clicked "OK," so you can proceed with the action.
      // You can put your action logic here.

      this.agentService.deleteAgent(agent).subscribe(res => {
        console.log(res);
        alert('Status changed successfully');
        this.getAllAgent();
        window.location.reload()
      }, err => {
        console.log(err);
      }
      )
    } else {

    }
  }

  currentPage = 1;
  totalCount = 0;
  agents: any;
  headers: any
  paginatedEmployees: any[] = [];
  oldEmpObj: any
  pageSizes: number[] = [5, 10, 15];

  pageSize = this.pageSizes[0];

  get() {

    this.agentService.get(this.currentPage, this.pageSize).subscribe({
      next: (response) => {

        const paginationHeader = response.headers.get('X-Pagination');
        console.log(paginationHeader);
        const paginationData = JSON.parse(paginationHeader!);
        console.log(paginationData.TotalCount);

        this.totalCount = paginationData.TotalCount;
        this.agents = response.body;


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
    this.paginatedEmployees = this.agents.slice(start, end);
  }
  searchQuery: string | number = '';

  onSearch() {
    console.log(typeof this.searchQuery)
    this.agentService.getFilter(this.currentPage, this.pageSize, this.searchQuery).subscribe({
      next: (response) => {

        const paginationHeader = response.headers.get('X-Pagination');
        console.log(paginationHeader);
        const paginationData = JSON.parse(paginationHeader!);
        console.log(paginationData.TotalCount);

        this.totalCount = paginationData.TotalCount;
        this.agents = response.body;
        //this.updatePaginatedEmployees();

      }
    })
  }

}
