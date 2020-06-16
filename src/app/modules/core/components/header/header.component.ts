import {Component, OnInit, TemplateRef} from '@angular/core';
import {DialogRef, DialogService} from "ng-mountain";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public selectedProject: any;
  public isSearching: boolean;
  public searchText: string;

  private dialogRef: DialogRef;

  constructor(private dialogService: DialogService) {
  }

  ngOnInit(): void {
  }

  public openDropdown(projects: TemplateRef<any>, origin: HTMLElement) {
    this.dialogRef = this.dialogService.open({content: projects, origin});
  }

  search(searchText: string) {
    console.log(searchText);
  }

  runProject() {

  }
}
