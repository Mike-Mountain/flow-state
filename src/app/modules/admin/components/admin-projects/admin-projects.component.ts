import {Component, OnInit} from '@angular/core';
import {ProjectsQuery} from "../../../projects/store/projects.query";
import {createProjectsForm, Project} from "../../../projects/store/project.model";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProjectsService} from "../../../projects/store/projects.service";
import {NgmFileItem} from 'ng-mountain';
import {ListItem} from "../../../shared/models/list.model";

@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.scss']
})
export class AdminProjectsComponent implements OnInit {

  activeProject: Project;
  projectForm: FormGroup;
  screenshots: FormArray;
  projectList: ListItem[];

  constructor(public projectsQuery: ProjectsQuery,
              private projectsService: ProjectsService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.projectsQuery.getAll().length <= 0) {
      this.projectsService.get<Project[]>().subscribe(projects => {
        this.activeProject = projects[0];
        this.projectForm = createProjectsForm(this.formBuilder, this.activeProject);
        this.screenshots = this.projectForm.get('screenshots') as FormArray;
      });
    } else {
      this.activeProject = this.projectsQuery.getAll()[0];
      this.projectForm = createProjectsForm(this.formBuilder, this.activeProject);
      this.screenshots = this.projectForm.get('screenshots') as FormArray;
      this.projectList = this.projectsQuery.getAll().map(project => {
        return {
          label: project.title,
          value: project.slug,
        } as ListItem
      })
    }
  }

  public changeActiveProject(project: ListItem): void {
    this.activeProject = this.projectsQuery.getAll().filter(item => item.slug === project.value)[0];
    this.projectForm = createProjectsForm(this.formBuilder, this.activeProject);
    this.screenshots = this.projectForm.get('screenshots') as FormArray;
  }

  public submit() {
    if (this.activeProject) {
      this.projectsService.update<Project>(this.activeProject.id, this.projectForm.value).subscribe(project => {
        console.log(project);
      }, error => {
        console.log(error);
      });
    } else {
      console.log(this.projectForm.value);
      this.projectsService.add<Project>(this.projectForm.value).subscribe(project => {
        console.log(project);
      }, error => {
        console.log(error);
      });
    }
  }

  public createEmptyProject() {
    this.activeProject = undefined;
    this.projectForm = createProjectsForm(this.formBuilder, {});
  }

  public addFiles(files: Set<File>) {
    files.forEach(file => {
      console.log(file);
      this.screenshots.push(new FormControl(file));
    });
  }

}
