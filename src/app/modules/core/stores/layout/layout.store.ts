import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface LayoutState {
   key: string;
}

export function createInitialState(): LayoutState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'layout' })
export class LayoutStore extends Store<LayoutState> {

  constructor() {
    super(createInitialState());
  }

}
