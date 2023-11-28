import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.css']
})
export class CustomerModalComponent {
  @Input() customer: any;

  constructor(public activeModal: NgbActiveModal) { }
}
