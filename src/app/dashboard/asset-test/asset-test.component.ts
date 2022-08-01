import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asset-test',
  templateUrl: './asset-test.component.html',
  styleUrls: ['./asset-test.component.scss']
})
export class AssetTestComponent implements OnInit {

  constructor() { 
    console.log('test')
  }

  ngOnInit(): void {
  }

}
