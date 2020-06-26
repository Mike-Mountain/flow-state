import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ListItem} from "../../models/list.model";

@Injectable({
  providedIn: 'root'
})
export class ContentTabsService {

  get topActiveTab(): ListItem {
    return this._topActiveTab;
  }

  set topActiveTab(value: ListItem) {
    this._topActiveTab = value;
  }

  private _topActiveTab: ListItem;
  private topTabsList = new BehaviorSubject<ListItem[]>([]);
  private activeTabBottom = new BehaviorSubject<ListItem>(undefined);

  constructor() {
  }

  public getActiveTabBottom(): Observable<ListItem> {
    return this.activeTabBottom.asObservable();
  }

  public setActiveTabBottom(tab?: ListItem): void {
    if (tab) {
      this.activeTabBottom.next(tab);
    } else {
      this.activeTabBottom.next(undefined);
    }
  }

  public getTopTabsList(): Observable<ListItem[]> {
    return this.topTabsList.asObservable();
  }

  public addTabTop(tab: ListItem): void {
    const tabs = this.topTabsList.getValue();
    if (tabs.findIndex(item => item.label === tab.label) < 0) {
      tabs.push(tab);
    }
    this.topTabsList.next(tabs);
  }

  public removeTabTop(tab: ListItem): void {
    let tabs = this.topTabsList.getValue();
    tabs = tabs.filter(item => item.label !== tab.label);
    this.topTabsList.next(tabs);
  }
}
