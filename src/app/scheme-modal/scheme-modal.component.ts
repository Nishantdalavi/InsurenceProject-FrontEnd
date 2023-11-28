import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-scheme-modal',
  templateUrl: './scheme-modal.component.html',
  styleUrls: ['./scheme-modal.component.css']
})
export class SchemeModalComponent {
  @Input() scheme: any;

  constructor(public activeModal: NgbActiveModal) { }
}
