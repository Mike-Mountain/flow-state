import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './components/list/list.component';
import {ListItemDirective} from "./directives/list-item/list-item.directive";
import {AuthenticatedWithRoleDirective} from "./directives/authenticated-with-role/authenticated-with-role.directive";


@NgModule({
  declarations: [
    ListComponent,
    ListItemDirective,
    AuthenticatedWithRoleDirective
  ],
  exports: [
    ListComponent,
    ListItemDirective,
    AuthenticatedWithRoleDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
