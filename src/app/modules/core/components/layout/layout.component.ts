import {Component, OnInit} from '@angular/core';
import {LayoutQuery} from "../../stores/layout/layout.query";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(public layoutQuery: LayoutQuery) {
  }

  ngOnInit(): void {
  }

}
