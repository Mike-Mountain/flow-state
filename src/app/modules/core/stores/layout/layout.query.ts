import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { LayoutStore } from './layout.store';
import {LayoutState} from "./layout.model";

@Injectable({ providedIn: 'root' })
export class LayoutQuery extends Query<LayoutState> {

  constructor(protected store: LayoutStore) {
    super(store);
  }

}
