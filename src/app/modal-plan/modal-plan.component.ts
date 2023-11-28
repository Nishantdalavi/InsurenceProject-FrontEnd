import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-plan',
  templateUrl: './modal-plan.component.html',
  styleUrls: ['./modal-plan.component.css']
})
export class ModalPlanComponent {
  @Input() plan: any;
  constructor(public activeModal: NgbActiveModal) { }

}
