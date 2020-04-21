import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { BookFlightService } from "./book-flight.service";
import { FlightBooking } from '../shared/FlightBooking';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css'],
  providers: [BookFlightService]
})
export class BookFlightComponent implements OnInit {
  bookingForm: FormGroup;
  flightBookingObj :FlightBooking;  
  errorMessage: String;
  successMessage: String;

  constructor(private fb: FormBuilder, private bookFlightService: BookFlightService) { }


  ngOnInit() {
    this.bookingForm = this.fb.group({
      passengerName: ['', Validators.required],
      noOfTickets: ['',{ validators: [Validators.required, Validators.minLength(1), Validators.pattern('^[0-9]*$')]} ],
      flightId: ['',{ validators: [Validators.required,Validators.minLength(7), Validators.maxLength(7), Validators.pattern("[a-zA-Z]{3}-[0-9]{3}")]}]
    });
  
  }



  book() {
    // Code the method here 
    this.flightBookingObj = new FlightBooking();
    this.flightBookingObj.passengerName = this.bookingForm.get('passengerName').value;
    this.flightBookingObj.noOfTickets = this.bookingForm.get('noOfTickets').value; 
    this.flightBookingObj.flightId = this.bookingForm.get('flightId').value;  
     this.bookFlightService.getData(this.flightBookingObj).subscribe(
    flightBookingObj => this.successMessage = <any>flightBookingObj.message,
      error => this.errorMessage = <any>error
    );   
  } 
}

function validateFlight(c: FormControl) {
 /* 
    Code the validator here
    Use flightError as the property
*/

}


