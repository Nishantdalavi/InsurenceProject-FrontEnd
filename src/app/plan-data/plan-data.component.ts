import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Plan } from '../model/Plan';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanService } from '../services/plan.service';


@Component({
  selector: 'app-plan-data',
  templateUrl: './plan-data.component.html',
  styleUrls: ['./plan-data.component.css']
})
export class PlanDataComponent {
  planDetail !: FormGroup;
  planObj: Plan = new Plan();
  planList: Plan[] = [];
  constructor(private formBuilder: FormBuilder, private planService: PlanService) {

  }
  ngOnInit(): void {
    this.getAllPlans();
    this.planDetail = this.formBuilder.group({

      planId: [''],
      planName: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z][a-zA-Z\\s]*$'),
        Validators.minLength(2) // Minimum length of 2 characters
      ]],

      schemesCount: [''],




    });

  }
  addInsurancePlan() {

    if (this.planDetail.valid) {
      // Your existing code for updating an agent here
      console.log(this.planDetail);
      this.planObj.planId = 0;
      this.planObj.planName = this.planDetail.value.planName;
      this.planService.addInsurancePlan(this.planObj).subscribe(res => {
        console.log(res);
        alert("Data Added Successfully")
        window.location.reload()
      }, err => {
        alert("plan Exist")
        console.log(err);
        window.location.reload()

      });
    } else {
      alert('Please fill in all required fields correctly.');
    }

  }

  getAllPlans() {
    this.planService.getAllPlans().subscribe(res => {
      this.planList = res;
    }
      , err => {
        console.log("data is not fecting")



      });
  }

  editPlan(plan: Plan) {
    this.planDetail.controls['planId'].setValue(plan.planId);
    this.planDetail.controls['planName'].setValue(plan.planName);
  }
  updatePlan() {
    if (this.planDetail.valid) {
      // Your existing code for updating an agent here
      this.planObj.planId = this.planDetail.value.planId;
      this.planObj.planName = this.planDetail.value.planName;

      this.planService.updatePlan(this.planObj).subscribe(res => {
        console.log(res);
        this.getAllPlans();
      }, err => {

        console.log(err);
      })
    } else {
      alert('Please fill in all required fields correctly.');
    }


  }
  deletePlan(plan: Plan) {
    this.planService.deletePlan(plan).subscribe(res => {
      console.log(res);
      alert(' Plan Deleted Sucessfully');
      window.location.reload()
    }, err => {
      alert("Opps some issue")
      console.log(err);
      window.location.reload()
    }
    )
  }

}

