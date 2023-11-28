import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';
import { CustomerService } from '../services/customer.service';
import { CustomerProfileComponent } from '../customer-profile/customer-profile.component';
import { PlanService } from '../services/plan.service';
import { subscribeOn } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PolicyService } from '../services/policy.service';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-customerheader',
  templateUrl: './customerheader.component.html',
  styleUrls: ['./customerheader.component.css']
})
export class CustomerheaderComponent {
  customerProfile!: any
  username: any;
  iPlans: any;
  constructor(private customerService: CustomerService, private auth: AuthService,private jwt: JwtService, private policyService: PolicyService,
    private router: Router,
    private planService: PlanService,
    public dialog: MatDialog) {
    this.username = localStorage.getItem('username');

  }

  ngOnInit() {
    this.planService.getAllPlans().subscribe({
      next: (data) => {
        console.log(data)
        this.iPlans = data
      },
      error: (err: HttpClient) => {
        console.log(err)
      }

    });

    this.customerService.getCustomerProfile().subscribe({
      next: (res) => {
        this.customerProfile = res
        console.log(res);
        localStorage.setItem('userId', this.customerProfile.userId);
        localStorage.setItem('customerId', this.customerProfile.customerId);
      },
      error: (err) => {
        console.log(err)
      }
    })

  }
  showSchemes(index: number) {

    this.planService.setPlan(this.iPlans[index]);
    this.router.navigateByUrl('/customer/scheme/' + this.iPlans[index].planId)

  }
  cards = [

    {
      title: 'Policy',
      // icon: 'fa fa-file',
       icon: '/assets/policy.webp',
      route: '/customer/policy'

    },
    {
      title: 'Claims',
      // icon: 'fa fa-exclamation-circle',
      icon:'/assets/claim.jpeg',
      route: '/View/claim',
    },
    {
      title: 'Payments',
      // icon: 'fa fa-money',
      icon:'/assets/payment.jpeg',
      route: '/customer/payment'
    },


    {
      title: 'Querys',
      icon:'/assets/query.png',
      // icon: 'fa fa-exclamation-circle',
      route: '/customer/query',
    },
    {
      title: 'Document',
      icon:'/assets/document.png',
      // icon: 'fa fa-file',
      route: '/customer/view/document',
    },



  ];

  handleCardClick(card: any) {
    console.log('Clicked card:', card);
    // // Add your click handling logic here
    // if (card.title === 'Policy') {
    //   this.getPolicyByCustomerId();
    // }
  }
  showUserProfile() {

    // Get the username from local storage
    var username = localStorage.getItem('username');

    // Use the AdminService to fetch user details by username
    this.auth.getUserIdByUsername(username!).subscribe({
      next: (userId) => {
        // Use the userId to fetch user details by ID
        this.customerService.getUserDetailsById(userId).subscribe({
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
    const dialogRef = this.dialog.open(CustomerProfileComponent, {
      data: userData // Pass user data to the dialog
    });
  }

  customerId: any = localStorage.getItem('customerId');

  getPolicyByCustomerId() {

    this.customerService.getPoliciesByCustomerId(this.customerId).subscribe(
      (data) => {

        // Handle the response data here
        console.log(data);
      },
      (error) => {
        // Handle errors here
        console.error(error);
      }
    );
  }
  logout(): void {
    // Log out and remove the token
    this.jwt.destroyToken();
    this.router.navigateByUrl('/');
  }
}
