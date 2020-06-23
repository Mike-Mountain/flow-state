import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutDirective} from './directives/layout.directive';
import {LayoutComponent} from "./components/layout/layout.component";
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {ContentNavComponent} from "./components/content-nav/content-nav.component";
import {SidePanelComponent} from "./components/side-panel/side-panel.component";
import {SideNavComponent} from "./components/side-nav/side-nav.component";
import {NgmDialogModule} from "ng-mountain";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import { BottomContentComponent } from './components/bottom-content/bottom-content.component';
import { LazyContainerComponent } from './components/bottom-content/lazy-container/lazy-container.component';


@NgModule({
  declarations: [
    LayoutDirective,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ContentNavComponent,
    SidePanelComponent,
    SideNavComponent,
    BottomContentComponent,
    LazyContainerComponent
  ],
  exports: [
    LayoutDirective,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgmDialogModule,
    SharedModule
  ]
})
export class LayoutModule {
}
