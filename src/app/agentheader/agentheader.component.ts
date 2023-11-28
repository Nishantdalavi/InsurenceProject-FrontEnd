import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';
import { AgentService } from '../services/agent.service';
import { AgentProfileComponent } from '../agent-profile/agent-profile.component';
import { HttpClient } from '@angular/common/http';
import { PlanService } from '../services/plan.service';
import { CustomerService } from '../services/customer.service';
import { JwtService } from '../services/jwt.service';
@Component({
  selector: 'app-agentheader',
  templateUrl: './agentheader.component.html',
  styleUrls: ['./agentheader.component.css']
})
export class AgentheaderComponent {

  username: any;
  agentProfile: any;
  iPlans: any;
  constructor(private agentService: AgentService, private auth: AuthService,private jwt: JwtService, private planService: PlanService,

    private router: Router,
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

    this.agentService.getAgentProfile().subscribe({
      next: (res) => {
        this.agentProfile = res
        console.log(res);
        localStorage.setItem('userId', this.agentProfile.userId);
        localStorage.setItem('agentId', this.agentProfile.agentId);
      },
      error: (err) => {
        console.log(err)
      }
    })

  }
  cards = [

    {
      title: 'Policy',
      icon: 'fa fa-file',
      route: '/agent/policy'
    },
    {
      title: 'Customer',
      icon: 'fa fa-users',
      route: '/agent/customer'
    },

    {
      title: 'Commission',
      icon: 'fa fa-money',
      route: '/agent/commission'
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
        this.agentService.getUserDetailsById(userId).subscribe({
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
    const dialogRef = this.dialog.open(AgentProfileComponent, {
      data: userData // Pass user data to the dialog
    });
  }
  showSchemes(index: number) {

    this.planService.setPlan(this.iPlans[index]);
    this.router.navigateByUrl('agent/view/plan/' + this.iPlans[index].planId)

  }
  logout(): void {
    // Log out and remove the token
    this.jwt.destroyToken();
    this.router.navigateByUrl('/');
  }
}

