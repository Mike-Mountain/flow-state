import {Directive, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {ItemDirection} from "../../models/list.model";

@Directive({
  selector: '[appListItem]'
})
export class ListItemDirective implements OnInit, OnChanges {

  @Input() public tagColor: string;
  @Input() public hoverColor: string;
  @Input() public tagPosition: ItemDirection;
  @Input() public isActive: boolean;

  @HostListener('mouseover')
  private onHover(): void {
    this.setHoverColor();
  }

  @HostListener('mouseout')
  private onMouseLeave(): void {
    this.removeHoverColor();
  }

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, `border-${this.tagPosition}-active`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.isActive.currentValue === true) {
      this.renderer.setStyle(this.el.nativeElement, 'border-color', `var(--${this.tagColor})`);
      this.renderer.addClass(this.el.nativeElement, 'list-item-active');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'border-color');
      this.renderer.removeClass(this.el.nativeElement, 'list-item-active');
    }
  }

  private setHoverColor(): void {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', `rgba(var(--${this.hoverColor + 'Values'}), 0.6)`);
  }

  private removeHoverColor(): void {
    this.renderer.removeStyle(this.el.nativeElement, 'background-color');
  }

}
