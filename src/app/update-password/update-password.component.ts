import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  passwordForm: FormGroup;

  constructor(
    private passwordService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.passwordForm = this.formBuilder.group({
      username: ['', Validators.required],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  updatePassword() {

    if (this.passwordForm.invalid) {
      alert('Please fill in all fields.');
      return;
    }

    // Check if the old password matches the one in local storage
    const storedPassword = localStorage.getItem('password');
    if (this.passwordForm.value.oldPassword !== storedPassword) {
      alert('Old password is incorrect.');
      return;
    }

    // Send a request to update the password using the service
    this.passwordService.updatePassword(
      this.passwordForm.value.username,
      this.passwordForm.value.newPassword
    ).subscribe(
      (response) => {
        alert(`Password updated `);
        window.history.back()
        // You can also clear local storage or perform other actions here.
      },
      (error) => {
        console.error('Password update failed:', error);
        alert('Password update failed. Please try again later.');
      }
    );
  }
}
