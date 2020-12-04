import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { SwModalComponent } from 'src/app/components/sw-modal/sw-modal.component';
import { ResumesService } from 'src/app/services/resumes.service';

@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.page.html',
  styleUrls: ['./resumes.page.scss'],
})
export class ResumesPage implements OnInit {

  resumes = null
  userData = null
  resumesKeys = null
  isLoading: boolean =  false

  filter_value: string = 'all'

  constructor(
    private storage: Storage,
    private alert: ToastService,
    private modalControl: ModalController,
    private resumesService: ResumesService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.isLoading =  true
    this.storage.get('user_data').then(async data => {
      this.userData = data
      this.isLoading = false
      if (!data.profile_updated) {
        this.openModal('Bem vindo, você gostaria de preencher seu perfil agora?', true, data.user_type)
      }
    })

    this.filterResumes(this.filter_value)
  }

  refreshResumesList(event: any) {
    this.filterResumes(this.filter_value, event)
  }

  filterResumes(filter: string, event: any  = null) {
    if (filter === 'all') {
      this.resumes = null
      this.resumesKeys = null
      this.isLoading =  true
      this.resumesService.getAllResumes()
        .then(data => {
          if (data.val()) {
            this.resumes = data.val()
            this.isLoading = false
            this.resumesKeys = Object.keys(this.resumes)
          } else {
            this.alert.presentToast('Não há currículos cadastrados', 'bottom', 'danger')
          }
          if (event) {
            event.target.complete()
          }
        })
        .catch(error => {
          this.isLoading = false
          console.log(error)
          if (event) {
            event.target.complete()
          }
        })
    }
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

    modal.present()
  }

}
