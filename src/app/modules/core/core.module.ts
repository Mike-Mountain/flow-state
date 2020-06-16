import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './components/layout/layout.component';
import {LandingComponent} from './components/landing/landing.component';


@NgModule({
  declarations: [
    LayoutComponent,
    LandingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LayoutComponent,
    LandingComponent
  ]
})
export class CoreModule {
}
