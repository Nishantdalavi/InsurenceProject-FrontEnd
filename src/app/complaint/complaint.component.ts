import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Complaint } from '../model/Complaint';
import { ComplaintService } from '../services/complaint.service';
import { Router } from '@angular/router';
import { CustomerModalComponent } from '../customer-modal/customer-modal.component';
import { CustomerService } from '../services/customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent {
  title = "Welcome To Complaint API";
  complaintDetail!: FormGroup;
  complaintObj: Complaint = new Complaint();
  complaintList: any = [];

  constructor(private customerService: CustomerService, private modalService: NgbModal, private complaintService: ComplaintService, private router: Router, private formBuilder: FormBuilder) { }

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
    this.complaintObj.complaintId = this.complaintDetail.value.complaintId;
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
  customerIds: number = 0;
  getAllComplaints() {

    const customerIdString = localStorage.getItem('customerId');
    if (customerIdString !== null) {
      this.customerIds = +customerIdString; // Use the + operator to convert the string to a number
    } else {
    }
    this.complaintService.getComplaints().subscribe(
      res => {
        this.complaintList = res;
        console.log(this.complaintList)
      },
      (err) => {
        console.log("Unable to fetch complaint data", err);
      }
    );
  }

  editComplaint(complaint: Complaint) {
    const customerIdString = localStorage.getItem('customerId');
    if (customerIdString !== null) {
      this.customerId = +customerIdString; // Use the + operator to convert the string to a number
    } else {
    }
    this.complaintDetail.controls['complaintId'].setValue(complaint.complaintId);
    this.complaintDetail.controls['complaintName'].setValue(complaint.complaintName);
    this.complaintDetail.controls['complaintMessage'].setValue(complaint.complaintMessage);
    this.complaintDetail.controls['dateOfComplaint'].setValue(complaint.dateOfComplaint);
    this.complaintDetail.controls['Status'].setValue(complaint.Status);
    this.complaintDetail.controls['reply'].setValue(complaint.reply);
    this.complaintDetail.controls['customerId'].setValue(this.customerId);
  }
  customerId: number = 0;

  updateComplaint() {
    const customerIdString = localStorage.getItem('customerId');
    if (customerIdString !== null) {
      this.customerId = +customerIdString; // Use the + operator to convert the string to a number
    } else {
    }
    this.complaintObj.complaintId = this.complaintDetail.value.complaintId;
    this.complaintObj.complaintName = this.complaintDetail.value.complaintName;
    this.complaintObj.complaintMessage = this.complaintDetail.value.complaintMessage;
    this.complaintObj.dateOfComplaint = this.complaintDetail.value.dateOfComplaint;
    this.complaintObj.Status = this.complaintDetail.value.Status;
    this.complaintObj.reply = this.complaintDetail.value.reply;
    this.complaintObj.customerId = this.customerId

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
  getCustomerById(customerId: any) {
    var customers;
    this.customerService.getCustomerById(customerId).subscribe((data: any) => {
      customers = data;
      console.log(customers)
      this.openCustomerModal(customers)
    });
  }
  openCustomerModal(customer: any) {

    const modalRef = this.modalService.open(CustomerModalComponent, { centered: true, size: 'sm' });
    modalRef.componentInstance.customer = customer;
  }
}
