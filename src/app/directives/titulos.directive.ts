import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTitulos]'
})
export class TitulosDirective {

  @Input("appTitulos")letra!: boolean;


  constructor(
    private elemento: ElementRef,
    private renderer: Renderer2,
  ) { }
  ngOnInit(): void {
    this.renderer.setStyle(this.elemento.nativeElement, 'font-size', '20px');
    this.renderer.setStyle(this.elemento.nativeElement, 'font-weight', this.letra ?'bold':'500');
  }
}
