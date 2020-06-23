import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgmDialogRef, NgmDialogService} from "ng-mountain";

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

  constructor(private dialogService: NgmDialogService) {
  }

  ngOnInit(): void {
  }

  public openDropdown(projects: TemplateRef<any>, origin: HTMLElement): void {
    this.dialogRef = this.dialogService.open({content: projects, origin});
  }

  public search(searchText: string): void {
    console.log(searchText);
  }

  public runProject(): void {

  }
}
