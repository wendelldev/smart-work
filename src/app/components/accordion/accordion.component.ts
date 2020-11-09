import { Component, Input, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {

  expanded: boolean = true
  @ViewChild('wrapper', {read: ElementRef}) wrapper: ElementRef
  @Input('title') title: string

  icon: string = 'arrow-up'

  constructor(
    private renderer: Renderer2
  ) { }

  toggleAccordion() {
    if (this.expanded) {
      this.renderer.setStyle(this.wrapper.nativeElement, 'height', '0px')
    } else {
      this.renderer.setStyle(this.wrapper.nativeElement, 'height', 'auto')
    }

    this.expanded = !this.expanded
    this.icon = this.icon === 'arrow-up' ? 'arrow-down' : 'arrow-up'
  }

}
