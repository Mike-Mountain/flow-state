import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { LayoutStore, LayoutState } from './layout.store';

@Injectable({ providedIn: 'root' })
export class LayoutQuery extends Query<LayoutState> {

  constructor(protected store: LayoutStore) {
    super(store);
  }

}
