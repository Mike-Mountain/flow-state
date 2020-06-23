import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemDirection, ListItem} from "../../models/list.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() title: string;
  @Input() items: ListItem[];
  @Input() direction: 'horizontal' | 'vertical' = 'vertical';
  @Input() tagPosition: ItemDirection;
  @Input() tagColor: string;
  @Input() hoverColor: string;
  @Input() canHaveActiveItem = true;
  @Input() selectedValue?: string;

  @Output() item = new EventEmitter<string>();
  @Output() selectedItem = new EventEmitter<ListItem>();
  @Output() remove = new EventEmitter<{item: ListItem, index: number}>();


  constructor() {
  }

  ngOnInit(): void {
  }

  public selectValue(item: ListItem): void {
    this.selectedValue = item.value;
    this.selectedItem.emit(item);
    this.item.emit(this.selectedValue);
  }

  public removeItem(item: ListItem, event: Event, index: number) {
    event.preventDefault();
    this.remove.emit({item, index});
  }
}
