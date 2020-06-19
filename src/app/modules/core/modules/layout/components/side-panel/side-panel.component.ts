import {Component, OnInit} from '@angular/core';
import {NgmListItem} from "ng-mountain";
import {ProjectsQuery} from "../../../../../projects/store/projects.query";
import {ProjectsService} from "../../../../../projects/store/projects.service";
import {Project} from "../../../../../projects/store/project.model";
import {Subscription} from "rxjs";
import {LayoutService} from "../../store/layout.service";

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {

  public projects: NgmListItem[];
  public blogPosts: NgmListItem[];
  public state: {projects: boolean, blog: boolean};

  private projectsSubscription: Subscription;

  constructor(public projectsQuery: ProjectsQuery,
              private projectsService: ProjectsService,
              private layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.state = this.layoutService.sideNavState;
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
    this.layoutService.sideNavState[section] = false;
    if (!this.layoutService.sideNavState.blog && !this.layoutService.sideNavState.projects) {
      this.layoutService.updateSidePanelCol('0');
    }
  }

}
