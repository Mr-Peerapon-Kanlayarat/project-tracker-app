import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export class User {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  REST_API: string = 'http://localhost:4000/api';

  httpHeader = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  login(credentials: User): Observable<any> {
    let API_URL = `${this.REST_API}/users/login`;
    return this.httpClient.post(API_URL, credentials, { headers: this.httpHeader })
      .pipe(
        catchError(this.handleError)
      );
  }

  register(user: User): Observable<any> {
    let API_URL = `${this.REST_API}/users/register`;
    return this.httpClient.post(API_URL, user, { headers: this.httpHeader })
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

