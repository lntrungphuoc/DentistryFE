import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentRoute: any;

  constructor() {
  }

  ngOnInit(): void {
    this.currentRoute = window.location.href.split("/")[3];
  }
}
