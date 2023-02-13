import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  public get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        if (err?.error?.errorMessage)
          alert(err.error.errorMessage);
        return throwError(err);
      }),
      finalize(() => {
        console.log('Done calling api');
      })
    );
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(url, body).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        if (err?.error?.errorMessage)
          alert(err.error.errorMessage);
        return throwError(err);
      }),
      finalize(() => {
        console.log('Done calling api');
      })
    );
  }

  public put<T>(url: string, body: any): Observable<T> {
    return this.httpClient.put<T>(url, body).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        if (err?.error?.errorMessage)
          alert(err.error.errorMessage);
        return throwError(err);
      }),
      finalize(() => {
        console.log('Done calling api');
      })
    );
  }

  public delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        if (err?.error?.errorMessage)
          alert(err.error.errorMessage);
        return throwError(err);
      }),
      finalize(() => {
        console.log('Done calling api');
      })
    );
  }
}
