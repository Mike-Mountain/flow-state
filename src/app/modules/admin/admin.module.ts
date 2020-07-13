import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminContainerComponent} from './components/admin-container/admin-container.component';
import {AdminProjectsComponent} from './components/admin-projects/admin-projects.component';
import {SharedModule} from "../shared/shared.module";
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgmFileUploadModule} from "ng-mountain";


@NgModule({
  declarations: [
    AdminContainerComponent,
    AdminProjectsComponent,
    AdminNavComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgmFileUploadModule
  ]
})
export class AdminModule {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  public resolveComponent(): ComponentFactory<AdminContainerComponent> {
    return this.componentFactoryResolver.resolveComponentFactory(AdminContainerComponent);
  }
}
