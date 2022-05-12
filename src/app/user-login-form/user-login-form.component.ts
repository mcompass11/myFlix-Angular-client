import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() userCreds = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,) { }

  ngOnInit(): void {
  }
  /**
   * This function is responsible for sending the form inputs to the backend
   * @function loginUser
   * @return user data in JSON format
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userCreds).subscribe((response) => {
      //Logic for a successful user login
      this.dialogRef.close();
      console.log(response);
      localStorage.setItem('Username', response.user.Username);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      console.log(response.user)
      this.snackBar.open('user login successful', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies'])
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}
