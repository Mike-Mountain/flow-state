import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export interface SessionState {
  user: any;
  jwt: string;
}

export interface ApiUser {
  jwt: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: Role;
}

export interface Role {
  id: string;
  description: string;
  name: string;
  type: string;
}

export function createInitialState(): SessionState {
  return {
    user: undefined,
    jwt: undefined
  } as SessionState;
}

export function createApiUser(params?: Partial<ApiUser>): ApiUser {
  return {
    jwt: params?.jwt,
    user: createUser(params?.user)
  } as ApiUser;
}

export function createUser(params?: Partial<User>): User {
  return {
    id: params?.id,
    email: params?.email,
    username: params?.username,
    role: createRole(params?.role)
  } as User;
}

export function createRole(params?: Partial<Role>) {
  return {
    id: params?.id,
    description: params?.description,
    name: params?.name,
    type: params?.type
  } as Role;
}

export function createLoginForm(formBuilder: FormBuilder): FormGroup {
  return formBuilder.group({
    identifier: ['', Validators.required],
    password: ['', Validators.required]
  });
}
