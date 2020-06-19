import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Subscription} from "rxjs";
import {createLayout, GridColumns, GridRows, Layout} from "../store/layout.model";
import {LayoutQuery} from "../store/layout.query";
import {LayoutService} from "../store/layout.service";

@Directive({
  selector: '[appLayout]'
})
export class LayoutDirective implements OnInit, OnDestroy {

  @Input() panelName
  @Input() direction: 'rows' | 'columns';

  private layoutSubscription: Subscription;
  private currentLayout: Layout;
  private resizeHelper: HTMLElement;
  private parentNode: HTMLElement;

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              private layoutQuery: LayoutQuery,
              private layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.createHelperElements();
    this.subscribeToLayout();
    this.listen();
  }

  ngOnDestroy(): void {
    this.layoutSubscription.unsubscribe();
  }

  private subscribeToLayout(): void {
    this.layoutSubscription = this.layoutQuery.select().subscribe((layout) => {
      // If the current layout has not been set, use the initial layout
      if (!this.currentLayout) {
        this.currentLayout = createLayout({});
      }

      const gridName: string =
        this.panelName === 'sidePanelCol' ?
          'gridColumns' :
          'gridRows';

      const grid = this.direction === 'rows' ?
        layout.gridRows :
        layout.gridColumns;

      // Make sure to only update the panel who's size has changed
      const hasChanged = this.hasChanged(this.currentLayout[gridName][this.panelName], layout[gridName][this.panelName]);
      if (hasChanged || this.currentLayout[gridName][this.panelName] !== '0') {
        // TODO: Create the resize helper only when necessary
        this.toggleResizeHelper(grid);
        this.resizeElement(grid);
      }
      // Set current layout for the next iteration
      this.currentLayout = layout;
    });
  }

  private resizeElement(grid: GridColumns | GridRows) {
    const gridValues = Object.values(grid).join(' ');
    this.renderer.setStyle(this.parentNode, `grid-template-${this.direction}`, gridValues);
  };

  private listen() {
    const windowHeight = window.innerHeight;
    this.renderer.listen(this.resizeHelper, 'drag', (event) => {
      this.direction === 'columns' ?
        this.layoutService.updateSidePanelCol((event.pageX - 29) + 'px') :
        this.layoutService.updateBottomContentRow((windowHeight - event.pageY) - 45 + 'px');
    })
    // TODO: Fix broken vertical resize in Firefox
    this.renderer.listen(this.resizeHelper, 'dragend', (event) => {
      this.direction === 'columns' ?
        this.layoutService.updateSidePanelCol((event.screenX - 29) + 'px') :
        this.layoutService.updateBottomContentRow((windowHeight - event.pageY) - 45 + 'px');
    })
  }

  private toggleResizeHelper(grid: GridColumns | GridRows) {
    const gridValues = Object.values(grid).join(' ');
    if (gridValues.split(' ').includes('0')) {
      this.renderer.addClass(this.resizeHelper, 'resize-helper-hidden');
    } else {
      this.renderer.removeClass(this.resizeHelper, 'resize-helper-hidden');
    }
  }

  private createHelperElements() {
    this.parentNode = this.renderer.parentNode(this.el.nativeElement);
    this.resizeHelper = this.renderer.createElement('div');
    this.renderer.setAttribute(this.resizeHelper, 'draggable', 'true');
    this.renderer.appendChild(this.el.nativeElement, this.resizeHelper);
    this.direction === 'rows' ?
      this.renderer.addClass(this.resizeHelper, 'resize-helper-row') :
      this.renderer.addClass(this.resizeHelper, 'resize-helper-col');
  }

  private hasChanged(currentValue, newValue) {
    return currentValue !== newValue;
  }

}
