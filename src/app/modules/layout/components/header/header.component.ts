import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgmDialogConfig, NgmDialogRef, NgmDialogService} from "ng-mountain";
import {ProjectsQuery} from "../../../projects/store/projects.query";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public selectedProject: any;
  public isSearching: boolean;
  public searchText: string;

  private dialogRef: NgmDialogRef;

  constructor(private dialogService: NgmDialogService,
              public projectsQuery: ProjectsQuery) {
  }

  ngOnInit(): void {
  }

  public openDropdown(projects: TemplateRef<any>, origin: HTMLElement): void {
    const config: NgmDialogConfig = {
      dialogClass: 'dialog-box'
    };
    this.dialogRef = this.dialogService.open({content: projects, origin, config, width: '35%'});
  }

  public search(searchText: string): void {
    console.log(searchText);
  }

  public runProject(): void {

  }
}
