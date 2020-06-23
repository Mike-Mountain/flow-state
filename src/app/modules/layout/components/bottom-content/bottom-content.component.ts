import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {LayoutQuery} from "../../store/layout.query";
import {LayoutService} from "../../store/layout.service";
import {ContentTabsService} from "../../../shared/services/content-tabs/content-tabs.service";
import {ListItem} from "../../../shared/models/list.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-bottom-content',
  templateUrl: './bottom-content.component.html',
  styleUrls: ['./bottom-content.component.scss']
})
export class BottomContentComponent implements OnInit {

  @ViewChild('container', {read: ViewContainerRef}) private container: ViewContainerRef;

  public activeTab: Observable<ListItem>;

  constructor(private layoutQuery: LayoutQuery,
              private layoutService: LayoutService,
              private tabsService: ContentTabsService) {
  }

  ngOnInit(): void {
    this.activeTab = this.tabsService.getActiveTabBottom();
  }

  public closeBottomPanel(): void {
    this.layoutService.updateBottomContentRow('0');
  }
}
