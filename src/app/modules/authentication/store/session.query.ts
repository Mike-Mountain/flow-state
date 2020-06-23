import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {SessionStore} from './session.store';
import {SessionState, User} from "./session.model";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class SessionQuery extends Query<SessionState> {

  private token$ = this.select(state => state.jwt);
  private user$ = this.select(state => state.user);
  private isLoggedIn$ = this.select(state => (state.jwt !== null && state.jwt !== undefined));

  constructor(protected store: SessionStore) {
    super(store);
  }

  public selectUser$(): Observable<User> {
    return this.user$;
  }

  public getUser(): User {
    return this.store.getValue().user;
  }

  public selectToken$(): Observable<string> {
    return this.token$;
  }

  public getToken(): string {
    return this.store.getValue().jwt;
  }

  public selectIsLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn$;
  }

  public getIsLoggedIn(): boolean {
    return this.store.getValue().jwt?.length > 0;
  }

}
