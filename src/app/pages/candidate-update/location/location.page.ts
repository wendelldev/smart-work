import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocationService } from './../../../services/location.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['../candidate-update.page.scss'],
})
export class LocationPage implements OnInit {

  candidateForm: FormGroup
  userData: any

  states: any[] = []
  cities: any[] = []

  constructor(
    private formBuilder: FormBuilder,
    private location: LocationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.candidateForm = this.formBuilder.group({
      state_id: [null, Validators.required],
      city_id: [null, Validators.required],
    })

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.location.getStates().subscribe(
          (data: any[]) => this.states = data
        )
        this.userData = this.router.getCurrentNavigation().extras.state.user_data
        this.fetchCities(this.userData.state_id).subscribe((cities: any[]) => this.cities = cities)
        this.candidateForm.patchValue(this.userData)

      }
    })
  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    if (this.userData) {
      this.candidateForm.patchValue(this.userData)
    }
  }

  // Listar cidades conforme estado selecionado
  fetchCities(stateId: number): Observable<any[]> {
    return this.location.getCitiesByState(stateId)
  }

  // Atualiza de cidades conforme estado selecionado
  onStateChange(event): void {
    const stateId: number = event.detail.value
    this.fetchCities(stateId).subscribe((cities: any[]) => this.cities = cities)
    this.candidateForm.get('city_id').setValue(null)
  }

  goToRevision() {
    this.userData.state_id = this.candidateForm.get('state_id').value
    this.userData.city_id = this.candidateForm.get('city_id').value
    this.router.navigate(['/candidate-update/revision'], { state: { user_data: this.userData } })
  }
  
  nextPage() {
    this.userData.state_id = this.candidateForm.get('state_id').value
    this.userData.city_id = this.candidateForm.get('city_id').value
    this.router.navigate(['/candidate-update/scholarity'], { state: { user_data: this.userData } })
  }

}
