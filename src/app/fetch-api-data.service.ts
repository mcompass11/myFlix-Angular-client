import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://yourfavoritereels.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  /**
   * Inject the HttpClient module to the constructor or params
   * This will provide HttpClient to the entir class
   * making it available via this.http
   * @param http 
   */
  constructor(private http: HttpClient) {

  }
  /**
   * Making the api call for the user registration endpoint
   * @function userRegistration
   * @param userDetails 
   * @returns a new user object in JSON format
   */
  userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users/', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get all movies
   * @function getAllMovies
   * @returns an array of the movies object in JSON format 
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * User login
   * @function userLogin
   * @param userDetails 
   * @returns  users' data in JSON format
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Gets one movie
   * @function getMovie
   * @returns a movie object in JSON format
   */
  getMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Gets director
   * @function getDirector
   * @returns director's data in JSON format
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'director/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Gets genre
   * @function getGenre
   * @returns genre data in JSON format
   */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genre/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Gets single user
   * @function getUser
   * @returns user data in JSON format
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http.get(apiUrl + `users/${Username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Edit user
   * @function editUser
   * @param userData 
   * @returns updates user data in JSON format
   */
  editUser(userData: object): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http.put(apiUrl + `users/${Username}`, userData, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes user
   * @function deleteUser
   * @returns deletetion status
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http.delete(apiUrl + `users/${Username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get favorite movies for user
   * @function getFavMovies
   * @returns a list of users fav movies in JSON format
   */
  getFavMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http.get(apiUrl + `users/${Username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Add a movie to favorite movies
   * @function addFavMovies
   * @param MovieID 
   * @returns updates user fav movies list
   */
  addFavMovies(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http.post(apiUrl + `users/${Username}/movies/${MovieID}`, null, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Delete a movie from the favorite movies
   * @function deleteFavMovies
   * @param MovieID 
   * @returns updates users fav movies list
   */
  deleteFavMovies(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http.delete(apiUrl + `users/${Username}/movies/${MovieID}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Non - typed response extraction
   * @function extractResponseData
   * @param res 
   * @returns response || object
   */
  private extractResponseData(res: any): any {
    const body = res;
    return res || {};
  }

  /**
   * error response
   * @function handleError
   * @param error 
   * @returns error call
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
