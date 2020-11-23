import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vacancy-card',
  templateUrl: './vacancy-card.component.html',
  styleUrls: ['./vacancy-card.component.scss'],
})
export class VacancyCardComponent implements OnInit {

  @Input() vacancy: any
  @Input() userData: any

  subscriptions = null
  subscriptionsKeys = null

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions = this.vacancy.subscriptions

      if (this.subscriptions) {
        this.subscriptionsKeys = Object.keys(this.subscriptions)
      }
  }

  goToVacancyDetail() {
    this.router.navigate(['/vacancies', this.vacancy.id])
  }

  goToSubscriptions() {
    this.router.navigate(['/subscriptions'], { state: { subscriptions: this.subscriptions, vacancyId: this.vacancy.id } })
  }

}
