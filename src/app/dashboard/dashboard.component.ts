import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('dashboard')
  }

  gotoForeCast() {
    this.router.navigate(['/dashboard/']);
  }

  gotoTest() {
    this.router.navigate(['/dashboard/asset-test']);
  }

}
