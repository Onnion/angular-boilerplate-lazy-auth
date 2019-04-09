import { Directive, HostBinding, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[modal]'
})
export class ModalDirective implements OnInit, OnDestroy {

  @HostBinding('style.align-items') alignItems = 'center';
  @HostBinding('style.justify-content') justifyContent = 'center';
  @HostBinding('style.vertical-align') verticalAlign = 'middle';
  @HostBinding('style.height') height = '100vh';
  @HostBinding('style.max-width') maxWidth = '100%';
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.position') position = 'fixed';
  @HostBinding('style.z-index') zIndex = '999';
  @HostBinding('style.background') background = 'rgba(0, 0, 0, .6)';
  @HostBinding('style.left') left = '0';
  @HostBinding('style.top') top = '0';
  @HostBinding('style.bottom') bottom = '0';
  @HostBinding('style.right') right = '0';
  @HostBinding('style.display') display = 'flex';


  constructor() { }


  ngOnInit() {
    document.querySelector('body').style.overflowY = 'hidden';
  }


  ngOnDestroy() {
    document.querySelector('body').style.overflowY = 'visible';

  }

}
