import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidateForm } from '../helper/validateForm';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-agent-login',
  templateUrl: './agent-login.component.html',
  styleUrls: ['./agent-login.component.css']
})
export class AgentLoginComponent {



  // loginForm = new FormGroup({
  //   userName: new FormControl(''),
  //   password: new FormControl('')
  // })

  // loading = false;
  // loginUser() {
  //   this.loading = true;
  //   console.log(this.loginForm.value);

  //   var username: any = ''
  //   username = this.loginForm.value.userName;
  //   var password: any = ''
  //   password = this.loginForm.value.password;


  //   this.auth.getRoleByUsername(username).subscribe({
  //     next: (role) => {
  //       if (role == '3') {
  //         // Role is Admin, proceed with login
  //         this.auth.login(this.loginForm.value).subscribe({
  //           next: (data) => {
  //             this.token = data;
  //             console.log(this.token);

  //             localStorage.setItem('token', this.token.actualToken);

  //             localStorage.setItem('username', username);
  //             localStorage.setItem('password', password);


  //             alert('Login Successful');
  //             this.router.navigateByUrl('/agent/header');
  //           },
  //           error: (errorResponse: HttpErrorResponse) => {
  //             console.log(errorResponse);
  //             alert('Wrong id or password');
  //             this.loading = false;
  //           },
  //           complete: () => {
  //             // After the login operation is complete, set loading back to false to hide the spinner
  //             this.loading = false;
  //           }
  //         });
  //       } else {
  //         // Role is not Admin, show an alert
  //         alert('Invalid role.');
  //         this.loading = false;
  //       }
  //     },
  //     error: (errorResponse: HttpErrorResponse) => {
  //       console.log(errorResponse);
  //       this.loading = false;
  //       alert('Failed to get role for the given username.');
  //     }
  //   });
  // }

  //----------------------------------------------------------------

  loading = false; // Initialize loading flag
  token: any = '';

  constructor(private auth: AuthService, private router: Router) { }

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  jwtHelper = new JwtHelperService();

  loginUser() {
    this.loading = true; // Set loading to true when the login process starts

    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (data) => {
          this.token = data;
          const decodedToken = this.jwtHelper.decodeToken(this.token.actualToken);
          const role: string = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

          if (role === "Agent") {
            alert("Login Successfully");
            localStorage.setItem("token", this.token.actualToken);
            localStorage.setItem("username", this.loginForm.get('userName')?.value!);
            localStorage.setItem("password", this.loginForm.get('password')?.value!);
            this.router.navigateByUrl('/agent/header');
          } else {
            alert("Invalid Login");
          }
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
          console.log(error);
        },
        complete: () => {
          // After the login operation is complete, set loading back to false to hide the spinner
          this.loading = false;
        }
      });
    } else {
      ValidateForm.validateAllFormFileds(this.loginForm);
      alert("One or more fields are required");
      this.loading = false; // Set loading to false in case of form validation error
    }
  }
}
