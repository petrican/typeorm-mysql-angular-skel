import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
})
export class AutoFocusDirective implements AfterContentInit {
  @Input() public appAutoFocus: boolean | undefined;

  constructor(private el: ElementRef) {}

  public ngAfterContentInit(): void {
    setTimeout(() => {
      if (this.appAutoFocus) {
        this.el.nativeElement.focus();
      }
    });
  }
}
