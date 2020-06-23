import {
  ChangeDetectionStrategy,
  Compiler,
  Component,
  Injector,
  Input, OnChanges,
  OnInit, SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'app-lazy-container',
  templateUrl: './lazy-container.component.html',
  styleUrls: ['./lazy-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyContainerComponent implements OnInit, OnChanges {

  @ViewChild('container', {read: ViewContainerRef}) private container: ViewContainerRef;
  @Input() moduleName: string;

  constructor(private compiler: Compiler,
              private injector: Injector) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.moduleName?.currentValue === 'login') {
      this.loadAuthModule();
    } else if (changes?.moduleName?.currentValue === 'admin') {
      this.loadAdminModule();
    }
  }

  ngOnInit(): void {
  }

  loadAuthModule() {
    import('../../../../authentication/authentication.module').then(({AuthenticationModule}) => {
      this.compiler.compileModuleAsync(AuthenticationModule).then(moduleFactory => {
        // Create a moduleRef, resolve an entry component, create the component
        const moduleRef = moduleFactory.create(this.injector);
        const componentFactory = moduleRef.instance.resolveComponent();
        this.container.createComponent(componentFactory, null, moduleRef.injector);
      })
    });
  }

  loadAdminModule() {
    import('../../../../admin/admin.module').then(({AdminModule}) => {
      this.compiler.compileModuleAsync(AdminModule).then(moduleFactory => {
        // Create a moduleRef, resolve an entry component, create the component
        const moduleRef = moduleFactory.create(this.injector);
        const componentFactory = moduleRef.instance.resolveComponent();
        this.container.createComponent(componentFactory, null, moduleRef.injector);
      })
    });
  }

}
