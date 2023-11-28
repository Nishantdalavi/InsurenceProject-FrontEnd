import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Commission } from '../model/Commission';
import { CommissionService } from '../services/commission.service';
import { Router } from '@angular/router';
import { AgentModalComponent } from '../agent-modal/agent-modal.component';
import { Policy } from '../model/Policy';
import { ModalPolicyComponent } from '../modal-policy/modal-policy.component';
import { Agent } from '../model/Agent';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { AgentService } from '../services/agent.service';
import { ModalAgentComponent } from '../modal-agent/modal-agent.component';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.css']
})
export class CommissionComponent {
  commissionDetail!: FormGroup;
  commissionObj: Commission = new Commission();
  commissionList: any = [];

  constructor(private commissionService: CommissionService, private router: Router, private formBuilder: FormBuilder,
    private modalService: NgbModal, private http: HttpClient, private agentService: AgentService) { }

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
  agent!: Agent
  getAgentById(agentId: any) {

    this.agentService.getById(agentId).subscribe((data: any) => {
      this.agent = data;
      console.log(this.agent)
    });
    this.openAgentModal(this.agent)
  }

  // openAgentModal(agent: Agent) {
  //   const modalRef = this.modalService.open(AgentModalComponent, { centered: true, size: 'sm' });
  //   modalRef.componentInstance.agent = agent;
  // }

  fetchPolicyDetails(customerId: number) {
    var policy
    this.http.get<Policy>(`https://localhost:7124/api/Policy/GetById?Id=${customerId}`).subscribe((data) => {
      policy = data;
      console.log(data);
      this.openPolicyModal(policy)


    });
  }
  openPolicyModal(customer: any) {
    const modalRef = this.modalService.open(ModalPolicyComponent, { centered: true, size: 'sm' });
    modalRef.componentInstance.policy = customer;
  }
  fetchAgentDetails(customerId: number) {
    var agent
    if (customerId != null) {
      this.http.get<Agent>(`https://localhost:7124/api/Agent/GetByAgentId?Id=${customerId}`).subscribe((data) => {
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
