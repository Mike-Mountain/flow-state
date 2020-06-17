import {Component, OnInit} from '@angular/core';
import {NgmListItem} from "ng-mountain";

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {

  testProjects: NgmListItem[] = [
    {label: 'Test Project One', value: '1'},
    {label: 'Test Project Two', value: '2'},
    {label: 'Test Project Three', value: '3'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
