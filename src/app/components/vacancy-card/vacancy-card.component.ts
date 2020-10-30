import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vacancy-card',
  templateUrl: './vacancy-card.component.html',
  styleUrls: ['./vacancy-card.component.scss'],
})
export class VacancyCardComponent implements OnInit {

  @Input() vacancy: any

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  goToVacancyDetail() {
    this.router.navigate(['/vacancies', this.vacancy.id])
  }

}
