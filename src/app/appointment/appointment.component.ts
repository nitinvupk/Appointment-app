import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  providers:[DatePipe]
})
export class AppointmentComponent implements OnInit {
  minDate: Date;
  myTime: Date;
  
  appointmentForm: FormGroup;
  submitted = false;
  id = '';
  arrLength = null;

  appointmentArr = [];
  displayAppointmentArr = [];

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
     private datePipe: DatePipe, private toastr: ToastrService) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")
    })

    this.appointmentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      date: [''],
      time: [''],
      businessId: [""]
    });

    this.getAppointments();
  }

  // convenience getter for easy access to form fields
  get f() { return this.appointmentForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.appointmentForm.invalid) {
      return;
    }

    this.appointmentForm.patchValue({
      businessId: this.id,
      date: this.datePipe.transform(this.appointmentForm.controls['date'].value, 'dd-MM-yyyy')
    });

    this.appointmentArr = [];
    if(this.arrLength != null) {
      this.appointmentArr = JSON.parse(localStorage.getItem("appointments"));
    }
    this.appointmentArr.push(this.appointmentForm.value);
    localStorage.setItem("appointments", JSON.stringify(this.appointmentArr));
    this.toastr.success("Successfully added!");
    this.submitted = false;
    this.appointmentForm.reset();
    this.getAppointments();
  }

  getAppointments() {
    this.displayAppointmentArr = [];
    this.arrLength = JSON.parse(localStorage.getItem("appointments"));
    if(this.arrLength != null) {
      var that = this;
      let arr = JSON.parse(localStorage.getItem("appointments"));
      this.displayAppointmentArr = arr.filter(function (item) {
        return item.businessId == that.id;
    });
    } else {
      this.displayAppointmentArr = [];
    }
  }

  // Delete Appointment based on name because id is not there
  onDelete(name) {
    if(this.arrLength != null) {
      this.appointmentArr = JSON.parse(localStorage.getItem("appointments"));
      var index = this.appointmentArr.findIndex((obj) => obj.firstName == name);
      this.appointmentArr.splice(index, 1);
      localStorage.setItem("appointments", JSON.stringify(this.appointmentArr));
      this.toastr.success("Successfully deleted!");
      this.getAppointments();
      
    }
  }

}
