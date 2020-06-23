import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemDirection, ListItem} from "../../models/list.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() public title: string;
  @Input() public items: ListItem[];
  @Input() public direction: 'horizontal' | 'vertical' = 'vertical';
  @Input() public tagPosition: ItemDirection;
  @Input() public tagColor: string;
  @Input() public hoverColor: string;
  @Input() public canHaveActiveItem = true;
  @Input() public selectedValue?: string;

  @Output() private item = new EventEmitter<string>();
  @Output() private selectedItem = new EventEmitter<ListItem>();
  @Output() private remove = new EventEmitter<{item: ListItem, index: number}>();


  constructor() {
  }

  ngOnInit(): void {
  }

  public selectValue(item: ListItem): void {
    this.selectedValue = item.value;
    this.selectedItem.emit(item);
    this.item.emit(this.selectedValue);
  }

  public removeItem(item: ListItem, event: Event, index: number): void {
    event.preventDefault();
    this.remove.emit({item, index});
  }
}
