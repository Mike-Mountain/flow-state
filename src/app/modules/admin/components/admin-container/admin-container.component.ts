import { Component, OnInit } from '@angular/core';
import {ListItem} from "../../../shared/models/list.model";

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss']
})
export class AdminContainerComponent implements OnInit {

  adminList: ListItem[] = [
    {label: 'Projects', value: 'projects', showIcon: true, iconClass: 'fas fa-folder mr-2'},
    {label: 'Blog', value: 'blog', showIcon: true, iconClass: 'fas fa-blog mr-2'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
