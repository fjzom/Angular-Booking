import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FlightBooking } from '../shared/FlightBooking';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookFlightService {

  url = 'http://localhost:1020/bookFlight';
  obj: FlightBooking;
  errorMessage: String;

  constructor(private http: HttpClient) { }
 

  getData(data: FlightBooking): Observable<any> { 
    //Consume the exposed REST api from http://localhost:1020/bookFlight
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.url, JSON.stringify(data), { headers: options }).pipe(
      tap(data => console.log('Data Fetched:' + JSON.stringify(data))),
      catchError(this.handleError));


  }

  private handleError(err: HttpErrorResponse) {
    let errMsg = '';
    if (err.error instanceof Error) {
      console.log('An error ocurred(client-side):' + err.error.message);
      errMsg = err.error.message;
    } else {
      console.log('Backend error');
      errMsg = err.error.message;
    }
    return throwError(errMsg);
  }

}
