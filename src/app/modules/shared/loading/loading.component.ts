import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @HostBinding('style.min-height') minHeight = '100%';
  @Input() loading: boolean;


  constructor() { }


  ngOnInit() {
  }

}
