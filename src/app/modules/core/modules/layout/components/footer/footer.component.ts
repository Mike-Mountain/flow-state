import {Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NgmListItem} from "ng-mountain";
import {utilList, vitaList} from "../../../../constants/core.constants";
import {DatePipe} from "@angular/common";
import {LayoutService} from "../../store/layout.service";
import {LayoutQuery} from "../../store/layout.query";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @ViewChild('date') public dateControl: ElementRef;

  public vitaeList: NgmListItem[] = vitaList;
  public utilList: NgmListItem[] = utilList;

  private datePipe = new DatePipe('en-za');

  constructor(private zone: NgZone,
              private renderer: Renderer2,
              private layoutService: LayoutService,
              public layoutQuery: LayoutQuery) {
    zone.runOutsideAngular(() => {
      setInterval(() => {
        renderer.setProperty(this.dateControl.nativeElement, 'textContent', this.datePipe.transform(new Date(), 'HH:mm:ss'));
      }, 1000);
    });
  }

  ngOnInit(): void {
  }

  changeActivePanel(panel: string): void {
    if (this.layoutQuery.getValue().gridRows.bottomContentRow === '0') {
      this.layoutService.updateBottomContentRow('2fr');
    }
  }

}
