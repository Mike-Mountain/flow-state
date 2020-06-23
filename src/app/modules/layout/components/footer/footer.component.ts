import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {utilList, vitaList} from "../../constants/core.constants";
import {DatePipe} from "@angular/common";
import {LayoutService} from "../../store/layout.service";
import {LayoutQuery} from "../../store/layout.query";
import {ListItem} from "../../../shared/models/list.model";
import {ContentTabsService} from "../../../shared/services/content-tabs/content-tabs.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @ViewChild('date') public dateControl: ElementRef;

  public vitaeList: ListItem[] = vitaList;
  public utilList: ListItem[] = utilList;
  public vitaeHasActiveItem: boolean;
  public utilsHasActiveItem: boolean;

  private datePipe = new DatePipe('en-za');

  constructor(public layoutQuery: LayoutQuery,
              private tabsService: ContentTabsService,
              private zone: NgZone,
              private layoutService: LayoutService,
              private renderer: Renderer2) {
    zone.runOutsideAngular(() => {
      setInterval(() => {
        renderer.setProperty(this.dateControl.nativeElement, 'textContent', this.datePipe.transform(new Date(), 'HH:mm:ss'));
      }, 1000);
    });
  }

  ngOnInit(): void {
  }

  public changeActivePanel(panel: ListItem): void {
    this.tabsService.setActiveTabBottom(panel);
    if (this.layoutQuery.getValue().gridRows.bottomContentRow === '0') {
      this.layoutService.updateBottomContentRow('2fr');
    }
    this.utilsHasActiveItem = this.utilList.findIndex(util => util.value === panel.value) > -1;
    this.vitaeHasActiveItem = this.vitaeList.findIndex(vitae => vitae.value === panel.value) > -1;
  }

}
