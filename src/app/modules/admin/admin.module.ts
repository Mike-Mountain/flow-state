import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminContainerComponent} from './components/admin-container/admin-container.component';


@NgModule({
  declarations: [AdminContainerComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  public resolveComponent(): ComponentFactory<AdminContainerComponent> {
    return this.componentFactoryResolver.resolveComponentFactory(AdminContainerComponent);
  }
}
