import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingComponent} from './components/landing/landing.component';
import {RouterModule} from "@angular/router";
import {LayoutModule} from "../layout/layout.module";


@NgModule({
  declarations: [
    LandingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule
  ],
  exports: [
    LandingComponent,
    LayoutModule
  ]
})
export class CoreModule {
}
