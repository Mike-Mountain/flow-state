import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {LayoutStore} from './layout.store';
import {ColumnsLayout, LayoutState, RowsLayout} from "./layout.model";

@Injectable({providedIn: 'root'})
export class LayoutService {

  private renderer: Renderer2;

  constructor(private layoutStore: LayoutStore,
              private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  updateLayoutState(state: Partial<LayoutState>) {
    const currentState: LayoutState = this.layoutStore.getValue();
    const newState = {...currentState, ...state};
    this.layoutStore.update(newState);
  }

  resetLayoutState() {
    this.layoutStore.reset();
  }

  resizeElement(el: HTMLElement, size: string, type: 'rows' | 'columns', cellName: string) {
    let currentGrid = type === 'rows' ?
      this.layoutStore.getValue().gridRows :
      this.layoutStore.getValue().gridColumns;
    const newGrid = Object.assign({}, currentGrid);
    newGrid[cellName] = size;
    const gridValues = Object.values(newGrid).join(' ');
    this.renderer.setStyle(el, `grid-template-${type}`, gridValues);
    type === 'rows' ?
      this.updateLayoutState({gridRows: newGrid as RowsLayout}) :
      this.updateLayoutState({gridColumns: newGrid as ColumnsLayout});
  }

}
