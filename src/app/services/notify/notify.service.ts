import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';


@Injectable({
  providedIn: 'root'
})
export class NotifyService {


  constructor(private notify: NotifierService) { }


  /**
   * show
   *
   * @param type (string)
   * @param content (string)
   */
  public show(type: string, content: string): void {
    this.notify.notify(type, content);

  }


  /**
   * removeAll
   */
  public removeAll(): void {
    this.notify.hideAll();
  }

}
