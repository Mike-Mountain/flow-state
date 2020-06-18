import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {LayoutService} from "../stores/layout/layout.service";
import {LayoutState} from "../stores/layout/layout.model";
import {LayoutQuery} from "../stores/layout/layout.query";

@Directive({
  selector: '[appResizeLayout]'
})
export class ResizeLayoutDirective implements AfterViewInit, OnChanges {

  @Input() private panelName: string;
  @Input() private direction: 'columns' | 'rows';
  @Input() private layout: LayoutState;

  private resizeHelper: HTMLDivElement;
  private gridContainer: HTMLElement;

  @HostListener('document:dragover', ['$event'])
  onDragOver(event) {
    event.preventDefault();
  }

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              private layoutService: LayoutService,
              private layoutQuery: LayoutQuery) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.layout.isFirstChange()) {
      switch (this.panelName) {
        case 'sidePanel':
          // Make sure to only update the panel who's size has changed
          if (this.hasChanged(changes, 'sidePanelWidth')) {
            this.resizeElement(changes.layout.currentValue.sidePanelWidth);
          }
          break;
        case 'bottomPanel':
          // Make sure to only update the panel who's size has changed
          if (this.hasChanged(changes, 'bottomPanelHeight')) {
            this.resizeElement(changes.layout.currentValue.bottomPanelHeight);
          }
          break;
      }
    }
  }

  ngAfterViewInit(): void {
    this.gridContainer = this.el.nativeElement.parentElement;
    this.createHelperElements();
    this.listen();
  }

  resizeElement(size?: string, cellName?: string, layout?: LayoutState) {
    if (layout) {
      switch (cellName) {
        case 'sidePanel':
          this.layoutService.resizeElement(this.gridContainer, (layout.sidePanelWidth + 'px'), this.direction, 'sidePanelWidth');
          break;
        case 'bottomPanel':
          this.layoutService.resizeElement(this.gridContainer, (layout.bottomPanelHeight + 'px'), this.direction, 'bottomPanelHeight');
          break;
      }
    } else {
      if (typeof size === "number") {
        size = size + '%';
      }
      this.layoutService.resizeElement(this.gridContainer, size, this.direction, this.panelName);
    }
    if (size.includes('0')) {
      this.renderer.addClass(this.resizeHelper, 'd-none');
    } else {
      this.createHelperElements();
    }
  }

  private createHelperElements() {
    this.resizeHelper = this.renderer.createElement('div');
    this.renderer.setAttribute(this.resizeHelper, 'draggable', 'true');
    this.renderer.appendChild(this.el.nativeElement, this.resizeHelper);
    this.direction === 'rows' ?
      this.renderer.addClass(this.resizeHelper, 'resize-helper-row') :
      this.renderer.addClass(this.resizeHelper, 'resize-helper-col');
  }

  private listen() {
    const windowHeight = window.innerHeight;
    this.renderer.listen(this.resizeHelper, 'drag', (event) => {
      this.direction === 'columns' ?
        this.resizeElement((event.pageX - 29) + 'px') :
        this.resizeElement((windowHeight - event.pageY) - 45 + 'px');
    })
    // TODO: Fix broken vertical resize in Firefox
    this.renderer.listen(this.resizeHelper, 'dragend', (event) => {
      this.direction === 'columns' ?
        this.resizeElement((event.screenX - 29) + 'px') :
        this.resizeElement((windowHeight - event.pageY) - 45 + 'px');
    })
  }

  private hasChanged(changes: SimpleChanges, itemName: string) {
    return (
      changes.layout.currentValue[itemName] < changes.layout.previousValue[itemName] ||
      changes.layout.currentValue[itemName] > changes.layout.previousValue[itemName]
    );
  }
}
