import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule
  ]
})
export class AuthenticationModule {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  public resolveComponent(): ComponentFactory<LoginComponent> {
    return this.componentFactoryResolver.resolveComponentFactory(LoginComponent);
  }
}
