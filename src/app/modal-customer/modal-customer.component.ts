import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-customer',
  templateUrl: './modal-customer.component.html',
  styleUrls: ['./modal-customer.component.css']
})
export class ModalCustomerComponent {
  @Input() customer: any;
  constructor(public activeModal: NgbActiveModal) { }

}
