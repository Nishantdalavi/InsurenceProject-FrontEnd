import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css']
})
export class CustomModalComponent {
  @Input() modalTitle: string | undefined;
  @Input() modalContent: string | undefined;

  constructor(public activeModal: NgbActiveModal) {}

}
