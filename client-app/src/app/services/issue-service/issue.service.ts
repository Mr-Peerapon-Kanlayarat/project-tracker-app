import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export class Issue {
  id!: number;
  title!: string;
  description!: string;
  status!: string;
}

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  REST_API: string = 'http://localhost:4000/api';

  httpHeader = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  addIssue(data: Issue, projectId: any): Observable<any> {
    let API_URL = `${this.REST_API}/projects/${projectId}/issues`;
    return this.httpClient.post(API_URL, data, { headers: this.httpHeader })
      .pipe(
        catchError(this.handleError)
      );
  }

  getIssues(projectId: any): Observable<Issue[]> {
    let API_URL = `${this.REST_API}/projects/${projectId}/issues`;
    return this.httpClient.get<Issue[]>(API_URL, { headers: this.httpHeader })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateIssue(issueId: any, data: Issue): Observable<any> {
    let API_URL = `${this.REST_API}/issues/${issueId}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeader })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteIssue(issueId: any): Observable<any> {
    let API_URL = `${this.REST_API}/issues/${issueId}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeader })
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
