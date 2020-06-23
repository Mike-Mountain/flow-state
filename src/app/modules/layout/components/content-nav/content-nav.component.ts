import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ListItem} from "../../../shared/models/list.model";
import {ContentTabsService} from "../../../shared/services/content-tabs/content-tabs.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-content-nav',
  templateUrl: './content-nav.component.html',
  styleUrls: ['./content-nav.component.scss']
})
export class ContentNavComponent implements OnInit {

  tabsList: Observable<ListItem[]>;

  constructor(public tabsService: ContentTabsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.tabsList = this.tabsService.getTabsList();
  }

  selectTab(tab: ListItem) {
    this.tabsService.activeTab = tab;
    this.router.navigateByUrl(`/projects/details/${tab.value}`);

  }

  removeTab(tab: {item: ListItem, index: number}, tabs: ListItem[]) {
    if (this.tabsService.activeTab.label === tab.item.label) {
      this.tabsService.activeTab = tabs[tab.index - 1];
      this.router.navigateByUrl(`/projects/details/${tabs[tab.index - 1].value}`);
    }
    this.tabsService.removeTab(tab.item);
  }
}
