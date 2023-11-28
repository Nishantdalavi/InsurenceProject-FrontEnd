import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.css']
})
export class UserProfileDialogComponent {
  adminId: number;
  adminFirstName: string;
  adminLastName: string;
  userId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService, // Update with your Admin service
    private dialogRef: MatDialogRef<UserProfileDialogComponent>
  ) {
    this.adminId = data.adminId;
    this.adminFirstName = data.adminFirstName;
    this.adminLastName = data.adminLastName;
    this.userId = data.userId;
  }

  onSubmit() {
    // Create an object with the modified data
    const adminData = {
      adminId: this.adminId,
      adminFirstName: this.adminFirstName,
      adminLastName: this.adminLastName,
      userId: this.userId
    };

    // Call the API service to update the admin data
    this.adminService.updateAdmin(adminData).subscribe(
      (updatedAdminId) => {
        alert("Updated Successfully");
        console.log('Admin updated successfully.');
        this.dialogRef.close(updatedAdminId);
      },
      (error) => {
        alert("Some issue. Please try again later.");
        console.error('Error updating admin:', error);
      }
    );
  }
}
