import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {

  @Input() selected: string;
  @Output() selectedChange = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  public emitSelected(item: string): void {
    this.selectedChange.emit(item);
  }
}
