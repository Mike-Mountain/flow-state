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

  @Output() value = new EventEmitter<string>();

  public selectedValue: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  public selectValue(value: string): void {
    this.selectedValue = value;
    this.value.emit(value);
  }

}
