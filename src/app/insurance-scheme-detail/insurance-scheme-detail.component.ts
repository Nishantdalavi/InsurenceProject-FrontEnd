import { Component } from '@angular/core';
import { InsuranceScheme } from '../model/InsuranceScheme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InsuranceSchemeService } from '../services/insurance-scheme.service';
import { validateNonNegativeNumber } from '../helper/validateFunction';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-insurance-scheme-detail',
  templateUrl: './insurance-scheme-detail.component.html',
  styleUrls: ['./insurance-scheme-detail.component.css']
})
export class InsuranceSchemeDetailComponent {
  title = "Welcome To Scheme Api"
  schemeDetail!: FormGroup;
  schemeObj: InsuranceScheme = new InsuranceScheme(); // Use the Scheme model
  schemeList: any = [];

  constructor(private schemeService: InsuranceSchemeService, private router: Router, private formBuilder: FormBuilder,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getAllSchemes();
    this.getPlanNames()// Update the function to get all schemes
    this.schemeDetail = this.formBuilder.group({
      schemeId: [''],
      schemeName: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z][a-zA-Z\\s]*$'),
        Validators.minLength(2) // Minimum length of 2 characters
      ]],
      status: [true], // Set a default value, e.g., 'true'
      planId: ['', [Validators.required, validateNonNegativeNumber, Validators.min(0)]],
    });
  }

  addScheme() {


    if (this.schemeDetail.valid) {
      // Your existing code for adding an agent here
      const scheme: InsuranceScheme = {
        schemeName: this.schemeDetail.value.schemeName,
        status: this.schemeDetail.value.status,
        planId: this.schemeDetail.value.planId,
        schemeId: this.schemeDetail.value.schemeId,
      };

      this.schemeService.addScheme(scheme).subscribe(res => {
        console.log(res);
        this.getAllSchemes();
      }, err => {
        console.log(err);
      });
    } else {
      alert('Please fill in all required fields correctly.');
    }

  }

  getAllSchemes() {
    this.schemeService.getSchemes().subscribe(
      res => {
        this.schemeList = res;
      },
      err => {
        console.log("Unable to fetch scheme data", err);
      }
    );
  }

  editScheme(scheme: InsuranceScheme) {
    this.schemeDetail.controls['schemeId'].setValue(scheme.schemeId);
    this.schemeDetail.controls['schemeName'].setValue(scheme.schemeName);
    this.schemeDetail.controls['status'].setValue(scheme.status);
    this.schemeDetail.controls['planId'].setValue(scheme.planId);
  }

  updateScheme() {
    if (this.schemeDetail.valid) {
      // Your existing code for adding an agent here
      this.schemeObj.schemeId = this.schemeDetail.value.schemeId;
      this.schemeObj.schemeName = this.schemeDetail.value.schemeName;
      this.schemeObj.status = this.schemeDetail.value.status;
      this.schemeObj.planId = this.schemeDetail.value.planId;

      this.schemeService.updateScheme(this.schemeObj).subscribe(res => {
        console.log(res);
        this.getAllSchemes();
      }, err => {
        console.log(err);
      });
    } else {
      alert('Please fill in all required fields correctly.');
    }


  }

  deleteScheme(scheme: InsuranceScheme) {
    this.schemeService.deleteScheme(scheme.schemeId).subscribe(res => {
      console.log(res);
      alert('Scheme Deleted Successfully');
      this.getAllSchemes();
    }, err => {
      console.log(err);
    });
  }


  plans: any
  getPlanNames() {

    this.customerService.getAllPlan().subscribe(
      (res: any) => {
        this.plans = res;
        console.log(this.plans)
      },
      (err) => {
        console.log('Unable to fetch plan names', err);
      }
    );
  }
}