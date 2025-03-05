import { Observable } from 'rxjs';

export interface ActionButton {
  buttonName: string;
  disabled: Observable<boolean>;
  func: () => unknown;
}
