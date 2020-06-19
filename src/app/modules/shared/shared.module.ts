import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './components/list/list.component';
import {ListItemDirective} from "./directives/list-item.directive";


@NgModule({
  declarations: [
    ListComponent,
    ListItemDirective
  ],
  exports: [
    ListComponent,
    ListItemDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
