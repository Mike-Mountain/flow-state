import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ListItem} from "../../../shared/models/list.model";
import {ContentTabsService} from "../../../shared/services/content-tabs/content-tabs.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-content-nav',
  templateUrl: './content-nav.component.html',
  styleUrls: ['./content-nav.component.scss']
})
export class ContentNavComponent implements OnInit {

  public tabsList: Observable<ListItem[]>;

  constructor(public tabsService: ContentTabsService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit(): void {
    this.tabsList = this.tabsService.getTopTabsList();
  }

  public selectTab(tab: ListItem): void {
    this.tabsService.topActiveTab = tab;
    this.router.navigateByUrl(`/projects/details/${tab.value}`);

  }

  public removeTab(tab: { item: ListItem, index: number }, tabs: ListItem[]): void {
    if (this.tabsService.topActiveTab?.label === tab.item.label) {
      this.tabsService.topActiveTab = tabs[tab.index - 1];
      if (this.tabsService.topActiveTab) {
        this.router.navigateByUrl(`/projects/details/${tabs[tab.index - 1].value}`);
      } else {
        this.router.navigateByUrl('/');
      }
    }
    this.tabsService.removeTabTop(tab.item);
  }
}
