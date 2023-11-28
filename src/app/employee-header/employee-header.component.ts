import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { UserProfileDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';
import { EmployeeService } from '../services/employee.service';
import { EmployeeProfileComponent } from '../employee-profile/employee-profile.component';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.css']
})
export class EmployeeHeaderComponent {
  username: any;
  constructor(private employeeService: EmployeeService, private auth: AuthService,private jwt: JwtService,
    private router: Router,
    public dialog: MatDialog) {
    this.username = localStorage.getItem('username');
  }
  cards = [

    {
      title: 'Customer',
      // icon: 'fa fa-users',
      icon:'/assets/customer.jpeg',
      route: '/customer'
    },
    {
      title: 'Agent',
      // icon: 'fa fa-user-secret',
      icon:'/assets/agent.webp',
      route: '/agent'
    },
    {
      title: 'Commission',
      // icon: 'fa fa-money',
      icon:'/assets/comission.png',
      route: '/employee/commission'
    },
    {
      title: 'Documents',
      // icon: 'fa fa-file',
      icon:'/assets/document.png',
      route: '/customer/document'
    },
    {
      title: 'Query',
      // icon: 'fa fa-exclamation-circle',
      icon:'/assets/query.png',
      route: '/complaint',
    },


  ];

  handleCardClick(card: any) {
    console.log('Clicked card:', card);
    // Add your click handling logic here
  }
  showUserProfile() {

    // Get the username from local storage
    var username = localStorage.getItem('username');

    // Use the AdminService to fetch user details by username
    this.auth.getUserIdByUsername(username!).subscribe({
      next: (userId) => {
        // Use the userId to fetch user details by ID
        this.employeeService.getUserDetailsById(userId).subscribe({
          next: (userData) => {
            // Open the user profile dialog with the user data
            this.openUserProfileDialog(userData);
          },
          error: (errorResponse) => {
            console.log(errorResponse);
            alert('Failed to get user details.');
          }
        });
      },
      error: (errorResponse) => {
        console.log(errorResponse);
        alert('Failed to get user ID.');
      }
    });
  }

  // Function to open the user profile dialog
  openUserProfileDialog(userData: any) {
    const dialogRef = this.dialog.open(EmployeeProfileComponent, {
      data: userData // Pass user data to the dialog
    });
  }
  logout(): void {
    // Log out and remove the token
    this.jwt.destroyToken();
    this.router.navigateByUrl('/');
  }

}
