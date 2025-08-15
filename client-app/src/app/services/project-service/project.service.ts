import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export class Project {
  id!: number;
  name!: string;
  description!: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  REST_API: string = 'http://localhost:4000/api';

  httpHeader = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  addProject(data: Project): Observable<any> {
    let API_URL = `${this.REST_API}/projects`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProjects(): Observable<Project[]> {
    let API_URL = `${this.REST_API}/projects`;
    return this.httpClient.get<Project[]>(API_URL)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProjectById(projectId: any): Observable<any> {
    let API_URL = `${this.REST_API}/projects/${projectId}`;
    return this.httpClient.get<Project>(API_URL, { headers: this.httpHeader })
      .pipe(map((res: any) => {
        return res || [];
      }),
        catchError(this.handleError)
      );
  }

  deleteProject(projectId: any): Observable<any> {
    let API_URL = `${this.REST_API}/projects/${projectId}`;
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
