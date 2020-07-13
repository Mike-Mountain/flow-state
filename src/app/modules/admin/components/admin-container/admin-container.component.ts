import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss']
})
export class AdminContainerComponent implements OnInit {

  selectedSection: 'projects' | 'blog';

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.selectedSection = 'projects';
    // Because the component is built programmatically once the module is lazy-loaded,
    // Change detection fails to pick up and instantiate the child components.
    this.changeDetectorRef.detectChanges();
  }

}
