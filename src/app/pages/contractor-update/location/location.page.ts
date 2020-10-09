import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['../contractor-update.page.scss'],
})
export class LocationPage implements OnInit {

  contractorForm: FormGroup
  userData: any

  states: any[] = []
  cities: any[] = []

  constructor(
    private formBuilder: FormBuilder,
    private location: LocationService,
    private router: Router,
    private localStorage: Storage
  ) { }

  ngOnInit() {
    this.contractorForm = this.formBuilder.group({
      neighborhood: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      street: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      number: [null, [Validators.required, Validators.maxLength(5)]],
      state_id: [null, Validators.required],
      city_id: [null, Validators.required],
    })

    this.location.getStates().subscribe(
      (data: any[]) => this.states = data
    )
  }

  async ionViewWillEnter() {
    await this.localStorage.get('user_data')
      .then(data => {
        this.userData = JSON.parse(data)
        this.fetchCities(this.userData.state_id).subscribe((cities: any[]) => this.cities = cities)
        this.contractorForm.patchValue(this.userData)
      })
  }

  // Listar cidades conforme estado selecionado
  fetchCities(stateId: number): Observable<any[]> {
    return this.location.getCitiesByState(stateId)
  }

  // Atualiza de cidades conforme estado selecionado
  onStateChange(event): void {
    const stateId: number = event.detail.value
    this.fetchCities(stateId).subscribe((cities: any[]) => this.cities = cities)
    this.contractorForm.get('city_id').setValue(null)
  }
  
  // Pegar objetos de cidade e estado conforme os Id's
  nextPage() {
    this.userData.neighborhood = this.contractorForm.get('neighborhood').value
    this.userData.street = this.contractorForm.get('street').value
    this.userData.number = this.contractorForm.get('number').value
    this.userData.state_id = this.contractorForm.get('state_id').value
    this.userData.city_id = this.contractorForm.get('city_id').value

    this.localStorage.set('user_data', JSON.stringify(this.userData))
    this.router.navigate(['/contractor-update/informations'])
  }

}
