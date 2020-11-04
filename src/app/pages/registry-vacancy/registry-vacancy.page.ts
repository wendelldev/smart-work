import { VacanciesService } from './../../services/vacancies.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LocationService } from 'src/app/services/location.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { SwModalComponent } from 'src/app/components/sw-modal/sw-modal.component';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-registry-vacancy',
  templateUrl: './registry-vacancy.page.html',
  styleUrls: ['./registry-vacancy.page.scss'],
})
export class RegistryVacancyPage implements OnInit {

  vacancyForm: FormGroup
  vacancyData = null
  userData = null

  hide_class = ''

  states: any[] = []
  cities: any[] = []

  technical_requirements: any[] = []
  behavior_requirements: any[] = []
  differentials: any[] = []
  formation_areas: any[] = []
  benefits: any[] = []

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private locationService: LocationService,
    private vacanciesService: VacanciesService,
    private toastService: ToastService,
    private modalControl: ModalController,
    private loadingControl: LoadingController,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.vacancyData = this.router.getCurrentNavigation().extras.state.vacancy_data

        this.vacancyForm.patchValue(this.vacancyData)
      }
    })
  }

  async ionViewWillEnter() {
    this.vacancyForm = this.formBuilder.group({
      contractor_name: [{value: null, disabled: true}, Validators.required],
      hide_informations: [false],
      objective: [null, [Validators.required]],
      salary: [null, [Validators.required]],
      contract_type: [null, [Validators.required]],
      modality: [null, [Validators.required]],
      state_id: [null, [Validators.required]],
      city_id: [null, [Validators.required]],
      neighborhood: [null, [Validators.required]],
      formation: [null, [Validators.required]],
      formation_details: [null],
      add_behavior: [null],
      add_benefit: [null],
      add_requirement: [null],
      add_differential: [null],
      add_formation_area: [null],
      objective_assignments: [null, [Validators.required]],
      contractor_phone: [null],
      contractor_email: [null]
    })

    await this.storage.get('user_data').then(userData => {
      this.userData = userData
      this.vacancyForm.get('contractor_name').setValue(userData.name)
      this.vacancyForm.get('contractor_email').setValue(userData.email)
      this.vacancyForm.get('contractor_phone').setValue(userData.comercial_phone)
    })

    this.locationService.getStates().subscribe(
      (data: any[]) => this.states = data
    )
  }

  ionViewDidLeave() {
    this.vacancyForm.reset()
  }

  async presentModal(text: string) {
    const modal = await this.modalControl.create({
      component: SwModalComponent,
      cssClass: 'sw-modal',
      componentProps: {
        "text": text
      }
    })

    modal.present()
  }

  showInfo(event): void {
    if (event.detail.checked === true) {
      this.hide_class = 'hide'
      this.presentModal(
        'Quando esta opção está ativa, algumas informações do contratante são ocultas \
        ao candidato, assim como o acesso ao perfil do contratante através desta vaga. \
        As informações ocultas serão destacadas em amarelo.'
      )
    } else {
      this.hide_class = ''
    }
  }

  fetchCities(stateId: number): Observable<any[]> {
    return this.locationService.getCitiesByState(stateId)
  }

  onStateChange(event): void {
    const stateId: number = event.detail.value
    this.fetchCities(stateId).subscribe((cities: any[]) => this.cities = cities)
    this.vacancyForm.get('city_id').setValue(null)
  }

  addRequirement() {
    const newRequirement = this.vacancyForm.get('add_requirement').value
    this.technical_requirements.push(newRequirement)
    this.vacancyForm.get('add_requirement').reset()
  }

  addDifferential() {
    const newDifferential = this.vacancyForm.get('add_differential').value
    this.differentials.push(newDifferential)
    this.vacancyForm.get('add_differential').reset()
  }

  addFormationArea() {
    const newFormationArea = this.vacancyForm.get('add_formation_area').value
    this.formation_areas.push(newFormationArea)
    this.vacancyForm.get('add_formation_area').reset()
  }

  addBehavior() {
    const newBehavior = this.vacancyForm.get('add_behavior').value
    this.behavior_requirements.push(newBehavior)
    this.vacancyForm.get('add_behavior').reset()
  }

  addBenefit() {
    const newBenefit = this.vacancyForm.get('add_benefit').value
    this.benefits.push(newBenefit)
    this.vacancyForm.get('add_benefit').reset()
  }

  removeRequirement(id: number) {
    this.technical_requirements.splice(id, 1)
  }

  removeDifferential(id: number) {
    this.differentials.splice(id, 1)
  }

  removeFormationArea(id: number) {
    this.formation_areas.splice(id, 1)
  }

  removeBehavior(id: number) {
    this.behavior_requirements.splice(id, 1)
  }

  removeBenefit(id: number) {
    this.benefits.splice(id, 1)
  }

  async publishVacancy() {
    await this.loadingService.presentLoadingDefault()
    if (this.technical_requirements.length === 0) {
      await this.loadingControl.dismiss()
      this.toastService.presentToast('Você precisa adicionar requisitos técnicos à sua vaga.', 'bottom', 'danger')
    } else {
      const vacancyObj = this.vacancyForm.value

      vacancyObj.contractor_name = this.vacancyForm.get('contractor_name').value
      vacancyObj.contractor_uid = this.userData.uid
      vacancyObj.technical_requirements = this.technical_requirements
      vacancyObj.differentials = this.differentials
      vacancyObj.formation_areas = this.formation_areas
      vacancyObj.behavior_requirements = this.behavior_requirements
      vacancyObj.benefits = this.benefits

      delete vacancyObj.add_requirement
      delete vacancyObj.add_differential
      delete vacancyObj.add_formation_area
      delete vacancyObj.add_benefit
      delete vacancyObj.add_behavior

      this.vacanciesService.registerVacancy(vacancyObj)

      await this.loadingControl.dismiss()
      this.router.navigate(['/tabs/vacancies'])
    }
  }

}
