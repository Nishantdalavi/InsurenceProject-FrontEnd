import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Complaint } from '../model/Complaint';
import { ComplaintService } from '../services/complaint.service';
import { Router } from '@angular/router';
import { CustomerModalComponent } from '../customer-modal/customer-modal.component';
import { CustomerService } from '../services/customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from '../model/Customer';
import { ModalCustomerComponent } from '../modal-customer/modal-customer.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-query',
  templateUrl: './admin-query.component.html',
  styleUrls: ['./admin-query.component.css']
})
export class AdminQueryComponent {
  title = "Welcome To Complaint API";
  complaintDetail!: FormGroup;
  complaintObj: Complaint = new Complaint();
  complaintList: any = [];

  constructor(private http: HttpClient
    , private complaintService: ComplaintService, private router: Router, private formBuilder: FormBuilder
    , private customerService: CustomerService, private modalService: NgbModal) { }

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
    this.complaintObj.complaintId = 0;
    this.complaintObj.complaintMessage = this.complaintDetail.value.complaintMessage,
      this.complaintObj.complaintName = this.complaintDetail.value.complaintName,
      this.complaintObj.reply = '',
      this.complaintObj.dateOfComplaint = this.complaintDetail.value.dateOfComplaint,
      this.complaintObj.Status = true,
      this.complaintObj.customerId = this.complaintDetail.value.customerId


    this.complaintService.addComplaint(this.complaintObj).subscribe((res) => {
      console.log(res);
      alert("Query added Sucessfully");



      window.location.reload()
    }, (err) => {
      console.log(err);

      alert("Not added")
    });
  }

  getAllComplaints() {
    this.complaintService.getComplaints().subscribe(
      res => {
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

  fetchCustomerDetails(customerId: number) {
    var customer;
    this.http.get<Customer>(`https://localhost:7124/api/Customer/GetById?Id=${customerId}`).subscribe((data) => {
      customer = data;
      console.log(data);
      this.openCustomerModal(customer)

    });
  }
  openCustomerModal(customer: any) {
    const modalRef = this.modalService.open(ModalCustomerComponent, { centered: true, size: 'sm' });
    modalRef.componentInstance.customer = customer;
  }

}
