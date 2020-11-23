import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'resume-card',
  templateUrl: './resume-card.component.html',
  styleUrls: ['./resume-card.component.scss'],
})
export class ResumeCardComponent implements OnInit {
  
  @Input() resume: any

  state = null
  city = null

  constructor(
    private locationService: LocationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.locationService.getStateById(this.resume.state_id).subscribe(
      (data: any) => {
        this.state = data[0]
      }
    )

    this.locationService.getCityById(this.resume.city_id).subscribe(
      (data: any) => {
        this.city = data[0]
      }
    )
  }

  goToResumeDetail() {
    this.router.navigate(['/resumes', this.resume.uid])
  }

}
