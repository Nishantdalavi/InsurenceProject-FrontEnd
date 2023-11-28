import { Component } from '@angular/core';
import { Commission } from '../model/Commission';
import { CommissionService } from '../services/commission.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AgentModalComponent } from '../agent-modal/agent-modal.component';
import { Policy } from '../model/Policy';
import { ModalPolicyComponent } from '../modal-policy/modal-policy.component';
import { Agent } from '../model/Agent';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-commission',
  templateUrl: './employee-commission.component.html',
  styleUrls: ['./employee-commission.component.css']
})
export class EmployeeCommissionComponent {
  commissionDetail!: FormGroup;
  commissionObj: Commission = new Commission();
  commissionList: any = [];

  constructor(private commissionService: CommissionService, private modalService: NgbModal, private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllCommissions();
    this.commissionDetail = this.formBuilder.group({
      commissionId: [0],
      amount: [0],
      date: [new Date()],
      status: [false],
      policyId: [null],
      agentId: [null],
    });
  }
  agent: any
  fetchAgentDetails(customerId: number) {
    if (customerId != null) {
      this.http.get<Agent>(`https://localhost:7124/api/Agent/Id?Id=${customerId}`).subscribe((data) => {
        this.agent = data;
        console.log(data)
        this.openAgentModal(this.agent)
      });
    }
    else {
      alert("Agent Id is Null")
    }
  }
  openAgentModal(customer: any) {
    const modalRef = this.modalService.open(AgentModalComponent, { centered: true, size: 'sm' });
    modalRef.componentInstance.agent = customer;
  }
  policy: any
  fetchPolicyDetails(customerId: number) {
    this.http.get<Policy>(`https://localhost:7124/api/Policy/GetById?Id=${customerId}`).subscribe((data) => {
      this.policy = data;
      console.log(data);
      this.openPolicyModal(this.policy)


    });
  }
  openPolicyModal(customer: any) {
    const modalRef = this.modalService.open(ModalPolicyComponent, { centered: true, size: 'sm' });
    modalRef.componentInstance.policy = customer;
  }

  addCommission() {
    console.log(this.commissionDetail)
    this.commissionObj.commissionId = 0;
    this.commissionObj.amount = this.commissionDetail.value.amount,
      this.commissionObj.commissionId = this.commissionDetail.value.commissionId,
      this.commissionObj.date = this.commissionDetail.value.date,
      this.commissionObj.status = false,
      this.commissionObj.policyId = this.commissionDetail.value.policyId,
      this.commissionObj.agentId = this.commissionDetail.value.agentId,


      this.commissionService.addCommission(this.commissionObj).subscribe((res) => {
        console.log(res);
        this.getAllCommissions();
        alert('Commission Added Successfully');
        window.location.reload()
      }, (err) => {
        console.log(err);
        alert("Commission not added")
      });
  }

  getAllCommissions() {
    this.commissionService.getCommissions().subscribe(
      res => {
        this.commissionList = res;
        console.log(this.commissionList)
      },
      (err) => {
        console.log("Unable to fetch commission data", err);
      }
    );
  }

  editCommission(commission: Commission) {
    this.commissionDetail.controls['commissionId'].setValue(commission.commissionId);
    this.commissionDetail.controls['amount'].setValue(commission.amount);
    this.commissionDetail.controls['date'].setValue(commission.date);
    this.commissionDetail.controls['status'].setValue(true);
    this.commissionDetail.controls['policyId'].setValue(commission.policyId);
    this.commissionDetail.controls['agentId'].setValue(commission.agentId);
    this.updateCommission()
  }

  updateCommission() {


    this.commissionObj.commissionId = this.commissionDetail.value.commissionId;
    this.commissionObj.amount = this.commissionDetail.value.amount;
    this.commissionObj.date = this.commissionDetail.value.date;
    this.commissionObj.status = true;
    this.commissionObj.policyId = this.commissionDetail.value.policyId;
    this.commissionObj.agentId = this.commissionDetail.value.agentId;

    this.commissionService.updateCommission(this.commissionObj).subscribe(res => {
      console.log(res);
      alert('Commission Updated Successfully');

      window.location.reload()
    }, err => {
      console.log(err);
      alert("NoT Updated")
    });
  }

  deleteCommission(commission: Commission) {
    this.commissionService.deleteCommission(commission.commissionId).subscribe(res => {
      console.log(res);
      alert('Commission Deleted Successfully');

      window.location.reload()
    }, err => {
      console.log(err);
      alert("Not Deleted");
    });
  }


}
