import { Component } from '@angular/core';
import { Commission } from '../model/Commission';
import { CommissionService } from '../services/commission.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Policy } from '../model/Policy';
import { ModalPolicyComponent } from '../modal-policy/modal-policy.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-agent-commission',
  templateUrl: './agent-commission.component.html',
  styleUrls: ['./agent-commission.component.css']
})
export class AgentCommissionComponent {
  commissionDetail!: FormGroup;
  commissionObj: Commission = new Commission();
  commissionList: any = [];

  constructor(private modalService: NgbModal, private http: HttpClient,
    private commissionService: CommissionService, private router: Router, private formBuilder: FormBuilder) { }

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
  agentId: number = 0;
  getAllCommissions() {
    const agentIdString = localStorage.getItem('agentId');
    if (agentIdString !== null) {
      this.agentId = +agentIdString; // Use the + operator to convert the string to a number
    } else {
    }
    this.commissionService.getCommissionByAgentId(this.agentId).subscribe(
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



}
