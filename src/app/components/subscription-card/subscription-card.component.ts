import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'subscription-card',
  templateUrl: './subscription-card.component.html',
  styleUrls: ['./subscription-card.component.scss'],
})
export class SubscriptionCardComponent implements OnInit {

  @Input() subscription: any

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  goToSubscriptionDetail() {
    this.router.navigate(['/subscription-detail'], { state: { subscriptionId: this.subscription.id, resumeId: this.subscription.uid, vacancyId: this.subscription.vacancy_id } })
  }

}
