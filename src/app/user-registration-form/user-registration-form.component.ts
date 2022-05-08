import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
  }

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      let newData = (({ Username, Password }) => ({ Username, Password }))(this.userData);
      this.fetchApiData.userLogin(newData).subscribe((response) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('Username', response.user.Username);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.dialogRef.close();
        this.router.navigate(['movies']);
      }, (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      });
      this.snackBar.open('User registered successfully!', 'OK', {
        duration: 2000
      });
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

}
