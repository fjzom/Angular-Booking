import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormsModule } from '@angular/forms';
import { ViewDetailsService } from "./view-details.service";
import { FlightBooking } from '../shared/FlightBooking';
import { Flights } from '../shared/Flight';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css'],
  providers: [ViewDetailsService]
})
export class ViewDetailsComponent implements OnInit {

  errorMessage: String;
  successMessage: String;
  bookings: Flights[];

  

  constructor(private viewDetailsService: ViewDetailsService) {

   }

  ngOnInit() {
    this.view();
}

  view() {
    this.viewDetailsService.view().subscribe(
      bookings => this.bookings = bookings,
      error  => this.errorMessage = <any>error
    ) 
  }

  delete(id) { 
    this.viewDetailsService.delete(id).subscribe(
      bookings=> this.successMessage = bookings.message,
      error => this.errorMessage = <any>error
    )
    if(this.successMessage){
      this.view(); 
    }

  }

}

