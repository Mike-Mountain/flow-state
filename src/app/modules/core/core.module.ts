import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './components/layout/layout.component';
import {LandingComponent} from './components/landing/landing.component';
import {ResizeLayoutDirective} from './directives/resize-layout.directive';
import {RouterModule} from "@angular/router";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentNavComponent } from './components/content-nav/content-nav.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import {FormsModule} from "@angular/forms";
import {OverlayModule} from "@angular/cdk/overlay";


@NgModule({
  declarations: [
    LayoutComponent,
    LandingComponent,
    ResizeLayoutDirective,
    HeaderComponent,
    FooterComponent,
    ContentNavComponent,
    SidePanelComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    OverlayModule
  ],
  exports: [
    LayoutComponent,
    LandingComponent
  ]
})
export class CoreModule {
}
