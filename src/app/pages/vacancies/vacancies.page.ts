import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FilterPopoverComponent } from 'src/app/components/filter-popover/filter-popover.component';
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

  filter_value: string = 'all'

  constructor(
    private storage: Storage,
    private modalControl: ModalController,
    private vacanciesService: VacanciesService,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.isLoading = true
    this.storage.get('user_data').then(async data => {
      this.userData = data
      this.isLoading = false
      if (!data.profile_updated) {
        this.openModal('Bem vindo, você gostaria de preencher seu perfil agora?', true, data.user_type)
      }
    })
    
    this.filterVacancies(this.filter_value)
  }

  refreshVacanciesList(event: any) {
      this.filterVacancies(this.filter_value, event)
  }

  filterVacancies(filter: string, ev: any = null) {
    if (filter === 'all') {
      this.vacancies = null
      this.keys = null
      this.isLoading = true
      this.vacanciesService.getAllVacancies()
      .then(data => {
        this.vacanciesService.addVacanciesToStorage(data.val())
        this.vacancies = data.val()
        this.isLoading = false
        this.keys = Object.keys(this.vacancies)
        if (ev) {
          ev.target.complete()
        }
      })
      .catch(error => {
        this.isLoading = false
        console.log(error)
        if (ev) {
          ev.target.complete()
        }
      })
    } else if (filter === 'my_vacancies') {
      this.isLoading = true
      this.vacancies = null
      this.keys = null
      this.vacanciesService.getContractorVacancies(this.userData.uid)
        .then(data => {
          this.vacancies = data.val()
          this.isLoading = false
          this.keys = Object.keys(this.vacancies)
          if (ev) {
            ev.target.complete()
          }
        })
        .catch(error => {
          this.isLoading = false
          console.log(error)
          if (ev) {
            ev.target.complete()
          }
        })
    }
  }

  async presentPopover(event: any) {
    const popover = await this.popoverController.create({
      component: FilterPopoverComponent,
      cssClass: 'filter_popover',
      event: event,
      translucent: true,
      componentProps: {
        "user_type": this.userData.user_type,
        "filter_value":  this.filter_value
      }
    })

    popover.onDidDismiss().then((data) => {
      this.filter_value = data.data
      this.filterVacancies(this.filter_value)
    })

    await popover.present()
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
