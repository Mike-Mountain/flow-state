import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { ProjectsStore, ProjectsState } from './projects.store';

@Injectable({ providedIn: 'root' })
export class ProjectsService extends NgEntityService<ProjectsState> {

  constructor(protected store: ProjectsStore) {
    super(store);
  }

}
