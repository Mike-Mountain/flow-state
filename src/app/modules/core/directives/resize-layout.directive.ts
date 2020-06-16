import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {LayoutService} from "../stores/layout/layout.service";

@Directive({
  selector: '[appResizeLayout]'
})
export class ResizeLayoutDirective implements OnInit {

  @Input() private cellName: string;
  @Input() private direction: 'columns' | 'rows';

  private resizeHelper: HTMLDivElement;
  private gridContainer: HTMLElement;

  @HostListener('document:dragover', ['$event'])
  onDragOver(event) {
    event.preventDefault();
  }

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              private layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.gridContainer = this.el.nativeElement.parentElement;
    this.createHelperElements();
    this.listen();
  }

  resizeElement(size: string) {
    this.layoutService.resizeElement(this.gridContainer, size, this.direction, this.cellName);
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
}
