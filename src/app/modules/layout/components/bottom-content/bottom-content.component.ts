import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {LayoutQuery} from "../../store/layout.query";

@Component({
  selector: 'app-bottom-content',
  templateUrl: './bottom-content.component.html',
  styleUrls: ['./bottom-content.component.scss']
})
export class BottomContentComponent implements OnInit {

  @ViewChild('container', {read: ViewContainerRef}) private container: ViewContainerRef;
  public activePanel: string;

  constructor(private layoutQuery: LayoutQuery) {
  }

  ngOnInit(): void {
    // TODO: Use the async pipe instead
    this.layoutQuery.select().subscribe(layout => {
      this.activePanel = layout.gridContent.bottomContent;
    })
  }

}
