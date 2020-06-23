import {ListItem} from "../../shared/models/list.model";

export const vitaList: ListItem[] = [
  {label: 'Skills', value: 'skills'},
  {label: 'Hobbies', value: 'hobbies'},
  {label: 'Experience', value: 'experience'},
  {label: 'Education', value: 'education'},
  {label: 'Contact', value: 'contact'},
]

export const utilList: ListItem[] = [
  {label: 'Github', value: 'github'},
  {label: 'Theme', value: 'theme'},
  {label: 'Admin', value: 'admin', isHidden: true},
  {label: 'Login', value: 'login'},
  {label: 'Logout', value: 'logout', isHidden: true},
]
