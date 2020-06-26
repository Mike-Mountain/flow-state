import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminContainerComponent} from './components/admin-container/admin-container.component';
import { AdminProjectsComponent } from './components/admin-projects/admin-projects.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    AdminContainerComponent,
    AdminProjectsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AdminModule {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  public resolveComponent(): ComponentFactory<AdminContainerComponent> {
    return this.componentFactoryResolver.resolveComponentFactory(AdminContainerComponent);
  }
}
