// import { Component, Input } from '@angular/core';
// import { AdminService } from '../services/admin.service';

// @Component({
//   selector: 'app-tax-percent',
//   templateUrl: './tax-percent.component.html',
//   styleUrls: ['./tax-percent.component.css']
// })
// export class TaxPercentComponent {
//   @Input() tax: any;

//   constructor(private taxService: AdminService) { }

//   ngOnInit(): void {   }

//   updateTax() {
//      
//     this.taxService.updateTax(this.tax).subscribe(
//       updatedTax => {
//         // Handle success
//         console.log('Tax updated:', updatedTax);
//       },
//       error => {
//         // Handle errors
//         console.error('Error updating tax:', error);
//       }
//     );
//   }
// }

import { Component, Input } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tax } from '../model/Tax';

@Component({
  selector: 'app-tax-percent',
  templateUrl: './tax-percent.component.html',
  styleUrls: ['./tax-percent.component.css']
})
export class TaxPercentComponent {
  title = "Tax Percent Component";
  taxDetail!: FormGroup;
  taxObj: Tax = new Tax();
  taxList: Tax[] = [];

  constructor(private taxService: AdminService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllTaxes();
    this.taxDetail = this.formBuilder.group({
      taxPercent: ['', Validators.required],
    });
  }

  getAllTaxes() {
    this.taxService.getTaxPercent().subscribe(
      res => {
        console.log(res)
        this.taxList = res as Tax[];
        console.log(this.taxList)
      },
      err => {
        console.log("Error fetching tax data", err);
      }
    );
  }

  editTax(tax: Tax) {
    this.taxDetail.controls['taxPercent'].setValue(tax.taxPercent);
  }

  updateTax() {
    this.taxObj.taxPercent = this.taxDetail.value.taxPercent;
    this.taxService.updateTax(this.taxObj).subscribe(
      res => {
        console.log(res);
        this.getAllTaxes();
      },
      err => {
        console.log(err);
      }
    );
  }
}

