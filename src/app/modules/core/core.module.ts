import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './components/layout/layout.component';
import {LandingComponent} from './components/landing/landing.component';
import {ResizeLayoutDirective} from './directives/resize-layout.directive';


@NgModule({
  declarations: [
    LayoutComponent,
    LandingComponent,
    ResizeLayoutDirective
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
