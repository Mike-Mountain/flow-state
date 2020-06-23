import {Injectable} from '@angular/core';
import {LayoutStore} from './layout.store';
import {Layout} from "./layout.model";

@Injectable({providedIn: 'root'})
export class LayoutService {

  get sideNavState(): { projects: boolean; blog: boolean } {
    return this._sideNavState;
  }

  set sideNavState(value: { projects: boolean; blog: boolean }) {
    this._sideNavState = value;
  }

  private _sideNavState = {projects: true, blog: false};

  constructor(private layoutStore: LayoutStore) {
  }

  // _____ GridRow Updates _____ //
  public updateBottomContentRow(height: string): void {
    const state: Layout = this.layoutStore.getValue();
    const newState: Layout = {
      ...state,
      gridRows: {
        ...state.gridRows,
        bottomContentRow: height,
      }
    }
    this.layoutStore.update(newState);
  }

  // _____ GridColumn Updates _____ //
  public updateSidePanelCol(width: string): void {
    const state: Layout = this.layoutStore.getValue();
    const newState: Layout = {
      ...state,
      gridColumns: {
        ...state.gridColumns,
        sidePanelCol: width,
      }
    }
    this.layoutStore.update(newState);
  }
}
