import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appFocusOnRender]'
})
export class FocusOnRenderDirective implements AfterViewInit {
  elementRef = inject(ElementRef);

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
  }
}
