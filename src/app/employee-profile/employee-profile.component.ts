import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent {
  employeeId: number;
  employeeFirstName: string;
  employeeLastName: string;
  phone: string;
  email: string;
  salary: number;
  userId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService: EmployeeService, // Update with your Employee service
    private dialogRef: MatDialogRef<EmployeeProfileComponent>
  ) {
    this.employeeId = data.employeeId;
    this.employeeFirstName = data.employeeFirstName;
    this.employeeLastName = data.employeeLastName;
    this.phone = data.phone;
    this.email = data.email;
    this.salary = data.salary;
    this.userId = data.userId;
  }

  onSubmit() {
    // Create an object with the modified data
    const employeeData = {
      employeeId: this.employeeId,
      employeeFirstName: this.employeeFirstName,
      employeeLastName: this.employeeLastName,
      phone: this.phone,
      email: this.email,
      salary: this.salary,
      userId: this.userId
    };

    // Call the API service to update the employee data
    this.employeeService.updateEmployee(employeeData).subscribe(
      (updatedEmployeeId) => {
        alert("Updated Successfully");
        console.log('Employee updated successfully.');
        this.dialogRef.close(updatedEmployeeId);
      },
      (error) => {
        alert("Some issue. Please try again later.");
        console.error('Error updating employee:', error);
      }
    );
  }
}
