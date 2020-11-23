import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'filter-subscriptions-popover',
  templateUrl: './filter-subscriptions-popover.component.html',
  styleUrls: ['./filter-subscriptions-popover.component.scss'],
})
export class FilterSubscriptionsPopoverComponent implements OnInit {

  @Input() filter_value: string

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}

  onFilterChange(event: any) {
    this.popoverController.dismiss(event.detail.value)
  }

  close() {
    this.popoverController.dismiss(this.filter_value)
  }

}
