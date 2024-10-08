import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderActionService {
  private actionSubject = new Subject<string>();
  action$ = this.actionSubject.asObservable();

  emitAction(action: string) {
    this.actionSubject.next(action);
  }
}