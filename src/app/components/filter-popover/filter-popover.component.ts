import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'filter-popover',
  templateUrl: './filter-popover.component.html',
  styleUrls: ['./filter-popover.component.scss'],
})
export class FilterPopoverComponent implements OnInit {

  @Input() user_type: string

  @Input() filter_value: string = 'all'

  constructor(
    private popoverController: PopoverController
  ) {}

  ngOnInit() {}

  onFilterChange(event: any) {
    this.popoverController.dismiss(event.detail.value)
  }

  close() {
    this.popoverController.dismiss()
  }

}
