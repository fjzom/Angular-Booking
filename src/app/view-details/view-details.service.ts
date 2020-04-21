import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Flights } from '../shared/Flight';

@Injectable()
export class ViewDetailsService {

  url = 'http://localhost:1020';
  constructor(private http: HttpClient) { 

  }

  view() : Observable<Flights[]> {
    //Consume the exposed URI's specified in QP
    return this.http.get<Flights[] | any>(this.url + '/getallId').pipe(
      tap(data => console.log('Data fetched' + JSON.stringify(data))),
    catchError(this.handleError));
  }

  delete(id) : Observable<any> {
    //Consume the exposed URI's specified in QP

    return this.http.delete(this.url + '/delete/' + id ).pipe(
      tap(data => console.log('Data fetched' + JSON.stringify(data))),
      catchError(this.handleError));
    
  }
  private handleError(err: HttpErrorResponse) {
    let errMsg = '';
    if (err.error instanceof Error) { 
      console.log('An error occurred client-side:', err.error.message);
      errMsg = err.error.message;
    } else { 
      console.log('Backend returned ');
      errMsg = err.error.status;
    }
    return throwError(errMsg);
  }
}
