import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-agent',
  templateUrl: './modal-agent.component.html',
  styleUrls: ['./modal-agent.component.css']
})
export class ModalAgentComponent {
  @Input() agent: any;
  constructor(public activeModal: NgbActiveModal) { }

}
