import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  userString: any = localStorage.getItem('user');
  user: any = JSON.parse(this.userString);

  movies: any[] = [];
  FavoriteMovies: any[] = [];
  displayElement: boolean = false;
  genres: any[] = [];

  @Input() userData = {
    _id: this.user._id,
    Username: this.user.Username,
    Email: this.user.Email,
    Birthday: this.user.Birthday,
    Password: this.user.Password,
  };

  constructor(
    public dialog: MatDialog, public fetchApidata: FetchApiDataService,
    public snackBar: MatSnackBar, public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
    console.log(this.userData);
    this.getFavMovies();

  }

  /**
   * gets user info
   * @function getUser
   * @returns user info
   */
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

  /**
   * allow edit of user profile
   * @function editUser
   * @returns updated user info in JSON format and storage in localStorage
   */
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

  /**
   * deletes user
   * @function deleteUser
   * @returns delete status and routes to welcome page
   */
  deleteUser(): void {
    if (confirm('Are you sure you want to delete this profile?')) {
      this.fetchApidata.deleteUser().subscribe(() => {
        this.snackBar.open(`User has been deleted!`, 'OK', {
          duration: 4000,
        });
        localStorage.clear();
      });
      this.router.navigate(['welcome']);
    }
  }

  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '480px'
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '480px'
    });
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '480px'
    });
  }

  getFavMovies(): void {
    this.fetchApidata.getAllMovies().subscribe((response: any) => {
      this.FavoriteMovies = response.filter((movie: any) => {
        return this.user.FavoriteMovies.includes(movie._id)
      });
      console.log(this.FavoriteMovies);
      return this.FavoriteMovies;
    })
  }

  deleteFavMovie(MovieID: string): void {
    this.fetchApidata.deleteFavMovies(MovieID).subscribe((response: any) => {
      console.log(response);
      this.snackBar.open(`Movie has been deleted from favs.`, 'OK', {
        duration: 2000,
      });
      window.location.reload();
      this.ngOnInit();
    });
    return this.getFavMovies();
  }

}
