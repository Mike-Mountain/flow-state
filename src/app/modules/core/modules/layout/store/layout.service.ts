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

  private _sideNavState = { projects: true, blog: false };

  constructor(private layoutStore: LayoutStore) {
  }

  // _____ GridRow Updates _____ //
  updateBottomContentRow(height: string) {
    const state: Layout = this.layoutStore.getValue();
    const gridRows = {
      bottomContentRow: height
    }
    const newState = {
      gridRows: state.gridRows,
      gridColumns: state.gridColumns
    };
    newState.gridRows = {...state.gridRows, ...gridRows};
    this.layoutStore.update(newState);
  }

  // _____ GridColumn Updates _____ //
  updateSidePanelCol(width: string) {
    const state: Layout = this.layoutStore.getValue();
    const gridColumns = {
      sidePanelCol: width
    }
    const newState = {
      gridRows: state.gridRows,
      gridColumns: state.gridColumns
    };
    newState.gridColumns = {...state.gridColumns, ...gridColumns};
    this.layoutStore.update(newState);
  }
}
