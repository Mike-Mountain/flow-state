import {Component, OnInit} from '@angular/core';
import {LayoutService} from "../../store/layout.service";
import {LayoutQuery} from "../../store/layout.query";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  public state: { projects: boolean, blog: boolean };

  constructor(private layoutService: LayoutService,
              private layoutQuery: LayoutQuery) {
  }

  ngOnInit(): void {
    this.state = this.layoutService.sideNavState;
  }

  togglePanel(panel: string) {
    this.layoutService.sideNavState[panel] = !this.layoutService.sideNavState[panel];
    // refresh component state
    this.state = this.layoutService.sideNavState;
    const sidePanelWidth = this.layoutQuery.getValue().gridColumns.sidePanelCol;
    if ((this.state.projects || this.state.blog) && sidePanelWidth === '0') {
      this.layoutService.updateSidePanelCol('15%');
    }
    if (!this.state.projects && !this.state.blog) {
      this.layoutService.updateSidePanelCol('0');
    }
  }
}
