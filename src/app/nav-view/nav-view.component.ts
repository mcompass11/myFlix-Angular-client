import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-nav-view',
  templateUrl: './nav-view.component.html',
  styleUrls: ['./nav-view.component.scss']
})
export class NavViewComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService, public router: Router, public dialog: MatDialogModule, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openProfilePage(): void {
    this.router.navigate(['profile']);
  }

  /**
   * function for user log out and clear localStorage
   */
  logOut(): void {
    localStorage.clear();
    this.snackBar.open('You are now logged out.', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);
  }

  toMovies(): void {
    this.router.navigate(['movies']);
  }
}
