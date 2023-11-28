import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-policy',
  templateUrl: './modal-policy.component.html',
  styleUrls: ['./modal-policy.component.css']
})
export class ModalPolicyComponent {
  @Input() policy: any;
  constructor(public activeModal: NgbActiveModal) { }

}
