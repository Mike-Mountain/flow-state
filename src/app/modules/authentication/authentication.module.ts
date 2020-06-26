import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgmDialogModule, NgmLoadingModule} from "ng-mountain";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgmLoadingModule,
    NgmDialogModule
  ]
})
export class AuthenticationModule {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  public resolveComponent(): ComponentFactory<LoginComponent> {
    return this.componentFactoryResolver.resolveComponentFactory(LoginComponent);
  }
}
