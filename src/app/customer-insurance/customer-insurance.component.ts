import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from '../services/plan.service';
import { forkJoin } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { Policy } from '../model/Policy';
import { ValidateForm } from '../helper/validateForm';
import { validateNonNegativeNumber } from '../helper/validateFunction';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-insurance',
  templateUrl: './customer-insurance.component.html',
  styleUrls: ['./customer-insurance.component.css']
})
export class CustomerInsuranceComponent {
  planId: any


  planSchemes: any[] = []
  premiumCalculateForm!: FormGroup
  premium!: number
  totalPremiumEMI!: number
  isDisabled: boolean = false
  MaturityAmount!: number
  policy: Policy = new Policy()
  policyModal: any
  customerProfile: any
  constructor(private activatedroute: ActivatedRoute, private customer: CustomerService, private router: Router,
    private modalService: NgbModal) {

  }

  ngOnInit() {

    this.planId = this.activatedroute.snapshot.paramMap.get('id');

    this.getSchemes()

    this.premiumCalculateForm = new FormGroup(
      {
        schemeName: new FormControl('', Validators.required),
        premiumMode: new FormControl('', [Validators.required]),
        term: new FormControl('', [Validators.required, validateNonNegativeNumber, Validators.min(0)]),
        sumAssured: new FormControl('', [Validators.required, validateNonNegativeNumber, Validators.min(0)]),
      },


    );
    this.getCustomerProfle()

  }
  customerId: number = 0
  getCustomerProfle() {
    const customerIdString = localStorage.getItem('userId');
    if (customerIdString !== null) {
      this.customerId = +customerIdString; // Use the + operator to convert the string to a number
    } else {
    }

    this.customer.getUserDetailsById(this.customerId).subscribe({
      next: (res) => {
        this.customerProfile = res;
        console.log(this.customerProfile)
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }

    })
  }

  getSchemes() {

    this.customer.getPlanByID(this.planId).subscribe((res) => {
      const schemeIds = res.schemesCount.map((scheme: any) => scheme.schemeId);

      forkJoin(schemeIds.map((schemeId: any) => this.customer.getDetail(schemeId))).subscribe(
        (detailsArray: any) => {
          const planSchemes = res.schemesCount.map((scheme: any, index: number) => {
            const details = detailsArray[index]
            return { ...scheme, additionalDetail: details };
          });
          this.planSchemes = planSchemes;
          console.log(this.planSchemes);
        },
        (error) => {
          console.log("Could not fetch data");
        }
      );
    });
  }
  checkRange(minValue: number, maxValue: number, value: number) {
    if (value >= minValue && value <= maxValue) {
      return true;
    } else {
      return false;
    }
  }

  calculatePremium() {

    if (this.premiumCalculateForm.valid) {
      const scheme = this.planSchemes.find((object) => object.schemeId == this.premiumCalculateForm.get('schemeName')!.value)

      if (this.checkRange(scheme.additionalDetail.minTerm, scheme.additionalDetail.maxTerm, this.premiumCalculateForm.get('term')!.value) &&
        this.checkRange(scheme.additionalDetail.minAmount, scheme.additionalDetail.maxAmount, this.premiumCalculateForm.get('sumAssured')!.value)) {

        let modeMultiplier = 1;
        switch (this.premiumCalculateForm.get('premiumMode')!.value) {
          case 'Monthly':
            modeMultiplier = 12;
            this.policy.premiumMode = 3;
            break;
          case 'Quaterly':
            modeMultiplier = 4;
            this.policy.premiumMode = 2;
            break;
          case 'Half Yearly':
            modeMultiplier = 2;
            this.policy.premiumMode = 1;
            break;
        }
        this.totalPremiumEMI = (modeMultiplier * this.premiumCalculateForm.get('term')!.value)
        this.premium = Math.round((this.premiumCalculateForm.get('sumAssured')!.value) / (this.totalPremiumEMI) * 100) / 100;
        //------------------------------------------------------------------------------------
        // Calculate the first premium commission




        //----------------------------------------------------------------------------------
        console.log(scheme)
        console.log(scheme.additionalDetail.profitPercent)
        const sumAssured = this.premiumCalculateForm.get('sumAssured')!.value;
        this.MaturityAmount = sumAssured + sumAssured * scheme.additionalDetail.profitPercent / 100;
        console.log(this.premium);
        console.log(this.MaturityAmount)
        //policy object
        this.policy.schemeId = scheme.schemeId
        this.policy.issueDate = new Date();

        // Calculate MaturityDate
        const termInYears = this.premiumCalculateForm.get('term')!.value;
        const maturityDate = new Date(this.policy.issueDate);
        maturityDate.setFullYear(maturityDate.getFullYear() + termInYears);

        this.policy.maturityDate = maturityDate;
        this.policy.premium = this.premium
        this.policy.sumAssured = this.premiumCalculateForm.get('sumAssured')!.value
        this.policy.totalPremiumNo = this.totalPremiumEMI
        this.policy.customerId = this.customerProfile['customerId']
        this.isDisabled = true;

      }
      else {
        alert("Invalid Term/SumAssured")
      }

    }
    else {
      ValidateForm.validateAllFormFileds(this.premiumCalculateForm)
      alert("one or more field required")
    }
  }

  checkValidity(minValue: number, maxValue: number) {
    const birthdate = new Date(this.customerProfile.dob);
    console.log(birthdate)
    const currentDate = new Date();

    // Calculate age in years
    const ageInMilliseconds = currentDate.getTime() - birthdate.getTime();
    const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    console.log(ageInYears)
    if (ageInYears >= minValue && ageInYears <= maxValue) {
      return true;
    } else {
      return false;
    }
  }
  buyPolicy() {

    const scheme = this.planSchemes.find((object) => object.schemeId == this.premiumCalculateForm.get('schemeName')!.value)
    if (this.customerProfile.documentsCount >= 3) {
      if (this.checkValidity(scheme.additionalDetail.minAge, scheme.additionalDetail.maxAge)) {
        if (this.customerProfile.documentsCount === 3) {
          this.customer.setPolicy(this.policy)
          this.router.navigateByUrl('customer/buyPolicy');
        }
        // this.customer.setPolicy(this.policy)
        // this.router.navigateByUrl('customer/buyPolicy');

      } else {
        alert("Not Eligible Document Not Verified")
      }

    }

    else {
      alert("Document Not Verified")
    }
    this.premiumCalculateForm.reset()

  }





}