import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agent-modal',
  templateUrl: './agent-modal.component.html',
  styleUrls: ['./agent-modal.component.css']
})
export class AgentModalComponent {
  @Input() agent: any;
  constructor(public activeModal: NgbActiveModal) { }
}
