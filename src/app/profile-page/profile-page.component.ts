import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  userString: any = localStorage.getItem('user');
  user: any = JSON.parse(this.userString);

  //user: any = {};
  // movies: any[] = [];
  // Username: any = localStorage.getItem('user');

  @Input() userData = {
    _id: this.user._id,
    Username: this.user.Username,
    Email: this.user.Email,
    Birthday: this.user.Birthday,
    Password: this.user.Password,
  };

  // @Input() newData = {
  //   Username: this.user.Username,
  //   Password: this.user.Password,
  //   Email: this.user.Email,
  //   Birthday: this.user.Birthday
  // }

  constructor(
    public dialog: MatDialog, public fetchApidata: FetchApiDataService,
    public snackBar: MatSnackBar, public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
    console.log(this.userData);
  }

  getUser(): void {
    const Username = localStorage.getItem('Username');
    if (Username) {
      this.fetchApidata.getUser().subscribe((response: any) => {
        this.user = response;
        console.log(this.user);
        return this.user;
      });
    }
  }

  editUser(): void {
    console.log(this.userData)
    this.fetchApidata.editUser(this.userData).subscribe((response) => {
      localStorage.setItem('user.Username', (response));
      console.log(response);
      this.snackBar.open('Profile update successful!', 'OK', {
        duration: 2000,
      });
      setTimeout(() => {
        window.location.reload();
      });
    });
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete this profile?')) {
      this.fetchApidata.deleteUser().subscribe(() => {
        this.snackBar.open(`${this.user.Username} has been deleted!`, 'OK', {
          duration: 2000,
        });
        localStorage.clear();
      });
      this.router.navigate(['welcome']);
    }
  }

}
