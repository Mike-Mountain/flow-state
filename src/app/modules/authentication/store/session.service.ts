import {Injectable} from '@angular/core';
import {SessionStore} from './session.store';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {createInitialState} from "./session.model";
import {environment} from "../../../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class SessionService {

  constructor(private sessionStore: SessionStore,
              private http: HttpClient) {
  }

  login(user: { identifier: string, password: string }): Observable<any> {
    const url = `${environment.apiUrl}/auth/local`;
    return this.http.post(url, user).pipe(
      tap(session => {
        this.sessionStore.update(session);
      })
    );
  }

  logout(): void {
    createInitialState();
    this.sessionStore.reset();
  }

}
