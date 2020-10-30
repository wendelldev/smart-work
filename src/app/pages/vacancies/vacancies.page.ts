import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SwModalComponent } from 'src/app/components/sw-modal/sw-modal.component';
import { VacanciesService } from 'src/app/services/vacancies.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.page.html',
  styleUrls: ['./vacancies.page.scss'],
})
export class VacanciesPage implements OnInit {

  vacancies = null
  userData = null
  keys = null
  isLoading: boolean = false

  constructor(
    private storage: Storage,
    private modalControl: ModalController,
    private vacanciesService: VacanciesService
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.isLoading = true
    this.storage.get('user_data').then(async data => {
      this.userData = data
      if (!data.profile_updated) {
        this.openModal('Bem vindo, você gostaria de preencher seu perfil agora?', true, data.user_type)
      }
    })
    
    this.vacanciesService.getAllVacancies()
      .then(data => {
        this.vacanciesService.addVacanciesToStorage(data.val())
        this.vacancies = data.val()
        this.isLoading = false
        this.keys = Object.keys(this.vacancies)
      })
      .catch(error => {
        this.isLoading = false
        console.log(error)
      })
  }

  refreshVacanciesList(event) {
    this.vacanciesService.getAllVacancies()
    .then(data => {
      this.vacanciesService.addVacanciesToStorage(data.val())
      this.vacancies = data.val()
      this.isLoading = false
      this.keys = Object.keys(this.vacancies)
      event.target.complete()
    })
    .catch(error => {
      this.isLoading = false
      console.log(error)
      event.target.complete()
    })
  }

  async openModal(text: string, profile_update: boolean, user_type: string) {
    const modal = await this.modalControl.create({
      component: SwModalComponent,
      componentProps: {
        'text': text,
        'profile_updated': profile_update,
        'user_type': user_type
      },
      cssClass: 'sw-modal'
    })

    await modal.present()
  }

}
