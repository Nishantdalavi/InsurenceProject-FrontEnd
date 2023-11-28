import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchemeDetail } from '../model/SchemeDetail';
import { SchemeDetailService } from '../services/scheme-detail.service';
import { Router } from '@angular/router';
import { InsuranceSchemeService } from '../services/insurance-scheme.service';
import { validateMinMax, validateNonNegativeNumber } from '../helper/validateFunction';

@Component({
  selector: 'app-scheme-detail',
  templateUrl: './scheme-detail.component.html',
  styleUrls: ['./scheme-detail.component.css']
})
export class SchemeDetailComponent implements OnInit {
  title = "Welcome To SchemeDetail API";
  schemeDetail!: FormGroup;
  schemeDetailObj: SchemeDetail = new SchemeDetail();
  schemeDetailList: any = [];
  selectedSchemeId: number=0;

  constructor(private schemeDetailService: SchemeDetailService, private router: Router, private formBuilder: FormBuilder, private insurance: InsuranceSchemeService) { }

  ngOnInit(): void {
    this.getAllSchemeDetails();
    this.getSchemeImages();
    this.schemeDetail = this.formBuilder.group({
      detailId: ['', Validators.required],
      schemeImage: [''],
      description: ['', [
        Validators.required,
        
        
      ]],
      minAmount: ['', [Validators.required, validateNonNegativeNumber, Validators.min(0)]],
      maxAmount: ['', [Validators.required, validateNonNegativeNumber, Validators.min(0)]],
      minAge: ['', [Validators.required, validateNonNegativeNumber, Validators.min(18)]],
      maxAge: ['', [Validators.required, validateNonNegativeNumber, Validators.min(0),Validators.max(80)]],
      minTerm: ['', [Validators.required, validateNonNegativeNumber, Validators.min(0)]],
      maxTerm: ['', [Validators.required, validateNonNegativeNumber, Validators.min(0)]],
      profitPercent: ['', [Validators.required, validateNonNegativeNumber, Validators.min(0),Validators.max(15)]],
      firstPremiumCommissionPercent: ['', [Validators.required, validateNonNegativeNumber, Validators.min(0),Validators.max(15)]],
      emiCommissionPercent: ['', [Validators.required, validateNonNegativeNumber, Validators.min(0),Validators.max(15)]],
      // status: [true], // Assuming status is initially set to true
    }, {
      validator: validateMinMax,
    });
  }

  addSchemeDetail() {

    const schemeDetail: SchemeDetail = {
      schemeImage: this.scheme.schemeName,
      description: this.schemeDetail.value.description,
      minAmount: this.schemeDetail.value.minAmount,
      maxAmount: this.schemeDetail.value.maxAmount,
      minAge: this.schemeDetail.value.minAge,
      maxAge: this.schemeDetail.value.maxAge,
      // status: this.schemeDetail.value.status,
      detailId: this.schemeDetail.value.detailId,
      minTerm: this.schemeDetail.value.minTerm,
      maxTerm: this.schemeDetail.value.maxTerm,
      profitPercent: this.schemeDetail.value.profitPercent,
      firstPremiumCommissionPercent: this.schemeDetail.value.firstPremiumCommissionPercent,
      emiCommissionPercent: this.schemeDetail.value.emiCommissionPercent
    };

    this.schemeDetailService.addSchemeDetail(schemeDetail).subscribe((res) => {
      console.log(res);
      this.getAllSchemeDetails();
      window.location.reload()
    }, (err) => {

      console.log(err);
    });
  }

  getAllSchemeDetails() {
    this.schemeDetailService.getSchemeDetails().subscribe(
      (res) => {
        this.schemeDetailList = res;
      },
      (err) => {
        console.log("Unable to fetch scheme detail data", err);
      }
    );
  }

  editSchemeDetail(schemeDetail: SchemeDetail) {
    this.schemeDetail.controls['detailId'].setValue(schemeDetail.detailId);
    this.schemeDetail.controls['schemeImage'].setValue(schemeDetail.schemeImage);
    this.schemeDetail.controls['description'].setValue(schemeDetail.description);
    this.schemeDetail.controls['minAmount'].setValue(schemeDetail.minAmount);
    this.schemeDetail.controls['maxAmount'].setValue(schemeDetail.maxAmount);
    this.schemeDetail.controls['minAge'].setValue(schemeDetail.minAge);
    this.schemeDetail.controls['maxAge'].setValue(schemeDetail.maxAge);

    this.schemeDetail.controls['minTerm'].setValue(schemeDetail.minTerm);
    this.schemeDetail.controls['maxTerm'].setValue(schemeDetail.maxTerm);
    this.schemeDetail.controls['profitPercent'].setValue(schemeDetail.profitPercent);
    this.schemeDetail.controls['firstPremiumCommissionPercent'].setValue(schemeDetail.firstPremiumCommissionPercent);
    this.schemeDetail.controls['emiCommissionPercent'].setValue(schemeDetail.emiCommissionPercent);
  }

  updateSchemeDetail() {
    this.schemeDetailObj.detailId = this.schemeDetail.value.detailId;
    this.schemeDetailObj.schemeImage = this.schemeDetail.value.schemeImage;
    this.schemeDetailObj.description = this.schemeDetail.value.description;
    this.schemeDetailObj.minAmount = this.schemeDetail.value.minAmount;
    this.schemeDetailObj.maxAmount = this.schemeDetail.value.maxAmount;
    this.schemeDetailObj.minAge = this.schemeDetail.value.minAge;
    this.schemeDetailObj.maxAge = this.schemeDetail.value.maxAge;

    this.schemeDetailObj.minTerm = this.schemeDetail.value.minTerm;
    this.schemeDetailObj.maxTerm = this.schemeDetail.value.maxTerm;
    this.schemeDetailObj.profitPercent = this.schemeDetail.value.profitPercent;
    this.schemeDetailObj.firstPremiumCommissionPercent = this.schemeDetail.value.firstPremiumCommissionPercent;
    this.schemeDetailObj.emiCommissionPercent = this.schemeDetail.value.emiCommissionPercent;
    // this.schemeDetailObj.status = this.schemeDetail.value.status;

    this.schemeDetailService.updateSchemeDetail(this.schemeDetailObj).subscribe((res) => {
      console.log(res);
      alert("Updated succesffully")
      this.getAllSchemeDetails();
      window.location.reload()
    }, (err) => {
      console.log(err);
    });
  }

  deleteSchemeDetail(schemeDetail: SchemeDetail) {
    this.schemeDetailService.deleteSchemeDetail(schemeDetail.detailId).subscribe((res) => {
      console.log(res);
      alert('SchemeDetail Deleted Successfully');
      
      this.getAllSchemeDetails();
      window.location.reload()

    }, (err) => {
      console.log(err);
    });
  }
  schemeImages: any
  getSchemeImages() {
    this.insurance.getSchemes().subscribe(
      (res: any) => {
        console.log(res)
        this.schemeImages = res;
      },
      (err) => {
        console.log('Unable to fetch scheme images', err);
      }
    );
  }
  scheme:any
  getSchemeName(detailId :number){
    this.insurance.getSchemeById(detailId).subscribe(
      (res)=>{
        console.log(res)
        this.scheme=res
        console.log(this.scheme)

      },
      (err)=>{
        console.log(err)
      }
    )
  }
}
