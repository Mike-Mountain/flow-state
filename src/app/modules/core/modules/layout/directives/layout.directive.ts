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
    this.layoutSubscription = this.layoutQuery.select().subscribe((layout) => {
      // If the current layout has not been set, use the initial layout
      if (!this.currentLayout) {
        this.currentLayout = createLayout({});
      }
      const grid: string =
        this.panelName === 'sidePanelCol' ?
          'gridColumns' :
          'gridRows';
      // Make sure to only update the panel who's size has changed
      if (this.hasChanged(this.currentLayout[grid][this.panelName], layout[grid][this.panelName])) {
        const grid = this.direction === 'rows' ?
          layout.gridRows :
          layout.gridColumns;
        this.resizeElement(grid);
      }
      // Set current layout for the next iteration
      this.currentLayout = layout;
    });
    this.listen();
  }

  ngOnDestroy(): void {
    this.layoutSubscription.unsubscribe();
  }

  private resizeElement(grid: GridColumns | GridRows) {
    const gridValues = Object.values(grid).join(' ');
    this.renderer.setStyle(this.parentNode, `grid-template-${this.direction}`, gridValues);

    if (gridValues.split(' ').includes('0')) {
      this.renderer.addClass(this.resizeHelper, 'resize-helper-hidden');
    } else {
      this.renderer.removeClass(this.resizeHelper, 'resize-helper-hidden');
    }
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
