import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  businesses = [
    {'id':101, 'name': 'business1'},
    {'id':102, 'name': 'business2'},
    {'id':102, 'name': 'business3'},
    {'id':104, 'name': 'business4'},
    {'id':105, 'name': 'business5'},
    {'id':106, 'name': 'business6'},
    {'id':107, 'name': 'business7'},
    {'id':108, 'name': 'business8'},
    {'id':109, 'name': 'business9'},
    {'id':110, 'name': 'business10'},
  ]

  ngOnInit(): void {
  }

}
