import { Component } from '@angular/core';
import { Payment } from '../model/Payment';
import { PaymentService } from '../services/payment.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Policy } from '../model/Policy';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPolicyComponent } from '../modal-policy/modal-policy.component';

@Component({
  selector: 'app-payment-customer',
  templateUrl: './payment-customer.component.html',
  styleUrls: ['./payment-customer.component.css']
})
export class PaymentCustomerComponent {
  title = "Welcome To Agent Api"
  paymentDetail !: FormGroup;
  paymentObj: Payment = new Payment();
  paymentList: Payment[] = [];

  constructor(private paymentService: PaymentService, private router: Router, private formBuilder: FormBuilder,
    private http: HttpClient, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.getAllPayment();
    this.paymentDetail = this.formBuilder.group({

      paymentId: [''],
      paymentType: [''],
      amount: [''],
      tax: [''],
      totalPayment: [''],
      policyNo: [''],
      customerId: [''],


    });

  }
  customerId: number = 0;
  getAllPayment() {
    const customerIdString = localStorage.getItem('customerId');
    if (customerIdString !== null) {
      this.customerId = +customerIdString; // Use the + operator to convert the string to a number
    } else {
    }
    this.paymentService.getPaymentByCustomerId(this.customerId).subscribe(
      res => {
        this.paymentList = res;
      },
      (err) => {
        console.log("Unable to fetch payment data", err);
      }
    );
  }


  add() {

    console.log(this.paymentDetail);
    this.paymentObj.paymentType = this.paymentDetail.value.paymentType;
    this.paymentObj.policyNo = this.paymentDetail.value.policyNo;
    this.paymentObj.tax = this.paymentDetail.value.tax;
    this.paymentObj.totalPayment = this.paymentDetail.value.totalPayment;
    this.paymentObj.paymentId = this.paymentDetail.value.paymentId;
    this.paymentObj.customerId = this.paymentDetail.value.customerId;


    this.paymentService.add(this.paymentObj).subscribe(res => {
      console.log(res);
      this.get();
      window.location.reload()
    }, err => {

      alert(" Payment unsuccessfull")

      console.log(err);
      window.location.reload()

    });
  }

  get() {
    this.paymentService.get().subscribe(res => {
      this.paymentList = res;
    }
      , err => {
        console.log("unable to fetch data")

      });
  }



  delete(payment: Payment) {
    this.paymentService.delete(payment).subscribe(res => {
      console.log(res);
      alert(' payment Deleted Sucessfully');
      window.location.reload()
    }, err => {
      console.log(err);
      alert("Not Deleted succesffully")
      window.location.reload()
    }
    )
  }



  currentPage = 1;
  totalCount = 0;
  payments: any;
  headers: any
  paginatedEmployees: any[] = [];
  oldEmpObj: any
  pageSizes: number[] = [5, 10, 15];

  pageSize = this.pageSizes[0];

  getPayment() {

    this.paymentService.getPayment(this.currentPage, this.pageSize).subscribe({
      next: (response) => {

        const paginationHeader = response.headers.get('X-Pagination');
        console.log(paginationHeader);
        const paginationData = JSON.parse(paginationHeader!);
        console.log(paginationData.TotalCount);

        this.totalCount = paginationData.TotalCount;
        this.payments = response.body;


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
    this.getPayment();

  }
  calculateSRNumber(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }
  onPageSizeChange(event: Event) {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.getPayment();
  }
  updatePaginatedEmployees() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEmployees = this.payments.slice(start, end);
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
