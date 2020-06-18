import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LayoutState} from "../../stores/layout/layout.model";
import {LayoutService} from "../../stores/layout/layout.service";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent implements OnInit, OnChanges {

  @Input() private layout: LayoutState
  public state: Partial<LayoutState>;

  constructor(private layoutService: LayoutService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes?.layout?.isFirstChange()) {
      this.state = {
        sideNavState: changes.layout.currentValue.sideNavState
      };
    }
  }

  ngOnInit(): void {
    this.state = {
      sideNavState: {
        blog: this.layout.sideNavState.blog,
        projects: this.layout.sideNavState.projects
      }
    };
  }

  togglePanel(panel: string) {
    this.state.sideNavState[panel] = !this.state.sideNavState[panel];
    if (this.state.sideNavState.projects || this.state.sideNavState.blog) {
      this.state.sidePanelWidth = 15;
    } else if (!this.state.sideNavState.projects && !this.state.sideNavState.blog) {
      this.state.sidePanelWidth = 0;
    }
    this.layoutService.updateLayoutState(this.state);
  }
}
