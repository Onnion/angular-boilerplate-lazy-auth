import { OnInit } from '@angular/core';

export class ListActionComponent implements OnInit {

  constructor() { }


  // WIP
  public actions($event): void {
    const action = $event.type === 'remove' ? 'openConfirm' : $event.type;
    this[action]($event.data);
  }


  ngOnInit() {
  }

}
