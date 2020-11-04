import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'subscription-card',
  templateUrl: './subscription-card.component.html',
  styleUrls: ['./subscription-card.component.scss'],
})
export class SubscriptionCardComponent implements OnInit {

  @Input() subscription: any

  constructor() { }

  ngOnInit() { }

}
