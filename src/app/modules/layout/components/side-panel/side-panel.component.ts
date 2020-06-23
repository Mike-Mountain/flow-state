import {Component, OnInit} from '@angular/core';
import {ProjectsQuery} from "../../../projects/store/projects.query";
import {ProjectsService} from "../../../projects/store/projects.service";
import {Project} from "../../../projects/store/project.model";
import {Subscription} from "rxjs";
import {LayoutService} from "../../store/layout.service";
import {ListItem} from "../../../shared/models/list.model";
import {ContentTabsService} from "../../../shared/services/content-tabs/content-tabs.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {

  public projects: ListItem[];
  public blogPosts: ListItem[];
  public state: { projects: boolean, blog: boolean };

  private projectsSubscription: Subscription;

  constructor(public projectsQuery: ProjectsQuery,
              public tabsService: ContentTabsService,
              private projectsService: ProjectsService,
              private layoutService: LayoutService,
              private router: Router) {
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

  public selectItem(item: ListItem, listName: string) {
    if (listName === 'projects') {
      const tab: ListItem = {
        ...item,
        iconClass: 'fab fa-2x fa-angular mr-2',
        showIcon: true,
        canRemove: true
      }
      this.tabsService.addTabTop(tab);
      this.tabsService.topActiveTab = tab;
      this.router.navigateByUrl(`/projects/details/${tab.value}`);
    }
  }

  public closeSection(section: string) {
    this.layoutService.sideNavState[section] = false;
    if (!this.layoutService.sideNavState.blog && !this.layoutService.sideNavState.projects) {
      this.layoutService.updateSidePanelCol('0');
    }
  }

}
