import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {SessionQuery} from "../../../authentication/store/session.query";
import {User} from "../../../authentication/store/session.model";

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[authenticatedWithRole]'
})
export class AuthenticatedWithRoleDirective implements OnInit, OnDestroy {

  @Input() authenticatedWithRole: string;
  userSubscription: Subscription;

  constructor(private el: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private sessionQuery: SessionQuery) {
  }

  ngOnInit() {
    this.viewContainer.clear();
    this.userSubscription = this.sessionQuery.selectUser$().subscribe(user => {
      switch (true) {
        case (user && this.hasRole(user)):
          this.createView();
          break;
        case (user && this.authenticatedWithRole.includes('Any')):
          this.createView();
          break;
        case (!user && this.authenticatedWithRole.includes('Unauthenticated')):
          this.createView();
          break;
        default:
          this.viewContainer.clear();
          break;
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  createView() {
    if (this.viewContainer.length < 1) {
      this.viewContainer.createEmbeddedView(this.el);
    }
  }

  private hasRole(user: User): boolean {
    return user.role.name === this.authenticatedWithRole;
  }
}
