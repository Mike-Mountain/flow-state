import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ListItem} from "../../models/list.model";

@Injectable({
  providedIn: 'root'
})
export class ContentTabsService {

  get activeTab(): ListItem {
    return this._activeTab;
  }

  set activeTab(value: ListItem) {
    this._activeTab = value;
  }

  private _activeTab: ListItem;
  private tabsList = new BehaviorSubject<ListItem[]>([]);

  constructor() {
  }

  public getTabsList(): Observable<ListItem[]> {
    return this.tabsList.asObservable();
  }

  public addTab(tab: ListItem): void {
    const tabs = this.tabsList.getValue();
    if (tabs.findIndex(item => item.label === tab.label) < 0) {
      tabs.push(tab);
    }
    this.tabsList.next(tabs);
  }

  public removeTab(tab: ListItem): void {
    let tabs = this.tabsList.getValue();
    tabs = tabs.filter(item => item.label !== tab.label);
    this.tabsList.next(tabs);
  }
}
