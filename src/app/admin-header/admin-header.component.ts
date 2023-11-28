import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {

  username: any;
  constructor(private adminService: AdminService, private auth: AuthService, private jwt: JwtService,
    private router: Router,
    public dialog: MatDialog) {
    this.username = localStorage.getItem('username');
  }
  cards = [
    {
      title: 'Employee',
      // icon: 'fa fa-id-badge',
      icon:'/assets/employeee.jpeg',
      route: '/employee'
    },
    {
      title: 'Policy',
      icon : '/assets/policy.webp',
      // icon: 'fa fa-file',
      route: '/policy'
    },
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
      title: 'Documents',
      // icon: 'fa fa-money',
      icon:'/assets/document.png',
      route: '/customer/document'
    },
    {
      title: 'Complaints',
      // icon: 'fa fa-exclamation-circle',
      icon:'/assets/query.png',
      route: '/admin/query',
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
    this.adminService.getUserIdByUsername(username!).subscribe({
      next: (userId) => {
        // Use the userId to fetch user details by ID
        this.adminService.getUserDetailsById(userId).subscribe({
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
    const dialogRef = this.dialog.open(UserProfileDialogComponent, {
      data: userData // Pass user data to the dialog
    });
  }

  logout(): void {
    // Log out and remove the token
    this.jwt.destroyToken();
    this.router.navigateByUrl('/');
  }


}
