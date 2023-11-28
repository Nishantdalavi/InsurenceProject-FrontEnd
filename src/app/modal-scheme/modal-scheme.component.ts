import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-scheme',
  templateUrl: './modal-scheme.component.html',
  styleUrls: ['./modal-scheme.component.css']
})
export class ModalSchemeComponent {
  @Input() insuranceScheme: any;
  @Input() schemeDetail: any;
  constructor(public activeModal: NgbActiveModal) { }

}
