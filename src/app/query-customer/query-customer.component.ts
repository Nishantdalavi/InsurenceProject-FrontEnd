import { Component } from '@angular/core';
import { Complaint } from '../model/Complaint';
import { ComplaintService } from '../services/complaint.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-query-customer',
  templateUrl: './query-customer.component.html',
  styleUrls: ['./query-customer.component.css']
})
export class QueryCustomerComponent {
  complaintDetail!: FormGroup;
  complaintObj: Complaint = new Complaint();
  complaintList: any = [];

  constructor(private complaintService: ComplaintService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllComplaints();
    this.complaintDetail = this.formBuilder.group({
      complaintId: [''],
      complaintName: [''],
      complaintMessage: [''],
      dateOfComplaint: [''],
      Status: [true],
      reply: [''],
      customerId: [null],
    });
  }

  addComplaint() {


    const customerIdString = localStorage.getItem('customerId');

    if (customerIdString !== null) {
      this.customerId = +customerIdString; // Use the + operator to convert the string to a number
    } else {
    }
    this.complaintObj.complaintId = 0;
    this.complaintObj.complaintMessage = this.complaintDetail.value.complaintMessage,
      this.complaintObj.complaintName = this.complaintDetail.value.complaintName,
      this.complaintObj.reply = '',
      this.complaintObj.dateOfComplaint = this.complaintDetail.value.dateOfComplaint,
      this.complaintObj.Status = true,
      this.complaintObj.customerId = this.customerId


    this.complaintService.addComplaint(this.complaintObj).subscribe((res) => {
      console.log(res);
      alert("Query added Sucessfully");



      window.location.reload()
    }, (err) => {
      console.log(err);

      alert("Not added")
    });
  }
  customerId: number = 0;
  getAllComplaints() {
    const customerIdString = localStorage.getItem('customerId');

    if (customerIdString !== null) {
      this.customerId = +customerIdString; // Use the + operator to convert the string to a number
    } else {
    }
    this.complaintService.getComplaintByCustomerId(this.customerId).subscribe(
      res => {
        console.log(res)
        this.complaintList = res;

      },
      (err) => {
        console.log("Unable to fetch complaint data", err);
      }
    );
  }

  editComplaint(complaint: Complaint) {
    this.complaintDetail.controls['complaintId'].setValue(complaint.complaintId);
    this.complaintDetail.controls['complaintName'].setValue(complaint.complaintName);
    this.complaintDetail.controls['complaintMessage'].setValue(complaint.complaintMessage);
    this.complaintDetail.controls['dateOfComplaint'].setValue(complaint.dateOfComplaint);
    this.complaintDetail.controls['Status'].setValue(complaint.Status);
    this.complaintDetail.controls['reply'].setValue(complaint.reply);
    this.complaintDetail.controls['customerId'].setValue(complaint.customerId);
  }

  updateComplaint() {
    this.complaintObj.complaintId = this.complaintDetail.value.complaintId;
    this.complaintObj.complaintName = this.complaintDetail.value.complaintName;
    this.complaintObj.complaintMessage = this.complaintDetail.value.complaintMessage;
    this.complaintObj.dateOfComplaint = this.complaintDetail.value.dateOfComplaint;
    this.complaintObj.Status = this.complaintDetail.value.Status;
    this.complaintObj.reply = this.complaintDetail.value.reply;
    this.complaintObj.customerId = this.complaintDetail.value.customerId;

    this.complaintService.updateComplaint(this.complaintObj).subscribe(res => {
      console.log(res);
      this.getAllComplaints();
      alert(' Query Updated Sucessfully');
      window.location.reload()
    }, err => {
      console.log(err);
      // window.location.reload()
    });
  }

  deleteComplaint(complaint: Complaint) {
    this.complaintService.deleteComplaint(complaint.complaintId).subscribe(res => {
      console.log(res);


      alert('Query Deleted Successfully');
      window.location.reload()
    }, err => {
      console.log(err);
      alert('some error while deleting')
    });
  }
}
