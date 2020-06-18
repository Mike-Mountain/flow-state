import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgmListItem} from "ng-mountain";
import {ProjectsQuery} from "../../../projects/store/projects.query";
import {ProjectsService} from "../../../projects/store/projects.service";
import {Project} from "../../../projects/store/project.model";
import {Subscription} from "rxjs";
import {LayoutService} from "../../stores/layout/layout.service";
import {LayoutState, SideNavState} from "../../stores/layout/layout.model";

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidePanelComponent implements OnInit, OnChanges {

  @Input() layout: LayoutState;

  public projects: NgmListItem[];
  public blogPosts: NgmListItem[];
  public projectsIsActive: boolean;
  public blogIsActive: boolean;

  private projectsSubscription: Subscription;

  constructor(public projectsQuery: ProjectsQuery,
              private projectsService: ProjectsService,
              private layoutService: LayoutService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes?.layout?.isFirstChange()) {
      this.blogIsActive = changes.layout.currentValue.sideNavState.blog;
      this.projectsIsActive = changes.layout.currentValue.sideNavState.projects;
    }
  }

  ngOnInit(): void {
    this.projectsIsActive = this.layout.sideNavState.projects;
    this.blogIsActive = this.layout.sideNavState.blog;
    if (this.projectsQuery.getAll().length <= 0) {
      this.projectsService.get<Project[]>().subscribe();
    }
    this.projectsSubscription = this.projectsQuery.selectAll().subscribe(projects => {
      this.projects = projects.map(project => {
        return {
          label: project.title,
          value: project.slug
        }
      });
    });
  }

  public closeSection(section: string) {
    this[section] = false;
    const state: SideNavState = {
      projects: this.projectsIsActive,
      blog: this.blogIsActive
    };
    this.layoutService.updateLayoutState({
      sideNavState: state
    });
    if (!this.blogIsActive && !this.projectsIsActive) {
      this.layoutService.updateLayoutState({
        sidePanelWidth: 0
      })
    }
  }

}
