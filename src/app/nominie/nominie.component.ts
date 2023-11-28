import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Nominee } from '../model/Nominee';
import { NomineeService } from '../services/nominee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nominie',
  templateUrl: './nominie.component.html',
  styleUrls: ['./nominie.component.css']
})
export class NominieComponent {
  nomineeDetail!: FormGroup;
  nomineeObj: Nominee = new Nominee();
  nomineeList: any = [];

  constructor(private nomineeService: NomineeService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllNominees();
    this.nomineeDetail = this.formBuilder.group({
      nominieId: [''],
      nominieName: [''],
      nominieRelation: [''],
      policyNo: [null],
      status: [true],
    });
  }

  addNominee() {
    const nominee: Nominee = {
      nominieId: this.nomineeDetail.value.nominieId,
      nominieName: this.nomineeDetail.value.nominieName,
      nominieRelation: this.nomineeDetail.value.nominieRelation,
      policyNo: this.nomineeDetail.value.policyNo,
      status: this.nomineeDetail.value.status,
    };

    this.nomineeService.addNominee(nominee).subscribe((res) => {
      console.log(res);
      this.getAllNominees();
    }, (err) => {
      console.log(err);
    });
  }

  getAllNominees() {
    this.nomineeService.getNominees().subscribe(
      res => {
        this.nomineeList = res;
      },
      (err) => {
        console.log("Unable to fetch nominee data", err);
      }
    );
  }

  editNominee(nominee: Nominee) {
    this.nomineeDetail.controls['nominieId'].setValue(nominee.nominieId);
    this.nomineeDetail.controls['nominieName'].setValue(nominee.nominieName);
    this.nomineeDetail.controls['nominieRelation'].setValue(nominee.nominieRelation);
    this.nomineeDetail.controls['policyNo'].setValue(nominee.policyNo);
    this.nomineeDetail.controls['status'].setValue(nominee.status);
  }

  updateNominee() {
    this.nomineeObj.nominieId = this.nomineeDetail.value.nominieId;
    this.nomineeObj.nominieName = this.nomineeDetail.value.nominieName;
    this.nomineeObj.nominieRelation = this.nomineeDetail.value.nominieRelation;
    this.nomineeObj.policyNo = this.nomineeDetail.value.policyNo;
    this.nomineeObj.status = this.nomineeDetail.value.status;

    this.nomineeService.updateNominee(this.nomineeObj).subscribe(res => {
      console.log(res);
      this.getAllNominees();
    }, err => {
      console.log(err);
    });
  }

  deleteNominee(nominee: Nominee) {
    this.nomineeService.deleteNominee(nominee.nominieId).subscribe(res => {
      console.log(res);
      alert('Nominee Deleted Successfully');
      this.getAllNominees();
    }, err => {
      console.log(err);
    });
  }
}
