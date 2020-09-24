import { LoadingService } from './../../services/loading.service';
import { AuthenticationService } from './../../services/authentication.service';
import { LocationService } from './../../services/location.service';
import { Crop } from '@ionic-native/crop/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonSlides, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastService } from 'src/app/services/toast.service';
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-candidate-update',
  templateUrl: './candidate-update.page.html',
  styleUrls: ['./candidate-update.page.scss'],
})
export class CandidateUpdatePage implements OnInit {

  candidateForm: FormGroup
  avatar: SafeResourceUrl
  avatarUrl: any = null
  uploadProgress = 0
  uploadFinalized: boolean = false

  states: any[] = []
  cities: any[] = []
  state: any
  city: any

  user: any
  userData: any

  @ViewChild(IonSlides) slides: IonSlides

  constructor(
    private formBuilder: FormBuilder,
    private file: File,
    private camera: Camera,
    private webview: WebView,
    private sanitizer: DomSanitizer,
    private crop: Crop,
    private actionSheet: ActionSheetController,
    private alert: ToastService,
    private storage: AngularFireStorage,
    private location: LocationService,
    private authService: AuthenticationService,
    private loadingService: LoadingService,
    private loadingControl: LoadingController
  ) { }

  ngOnInit() {
    this.candidateForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      residencial_phone: [null, [Validators.minLength(14)]],
      mobile_phone: [null, [Validators.required, Validators.minLength(15)]],
      linkedInUrl: [null],
      state_id: [null, Validators.required],
      city_id: [null, Validators.required],
      birthday: [null, [Validators.required, Validators.minLength(10)]],
      actuation_area: [null, Validators.required],
      scholarity: [null, Validators.required],
      qualifications: [null, Validators.required],
      experience: [null, Validators.required],
      presentation_text: [null]
    })

    this.location.getStates().subscribe(
      (data: any[]) => this.states = data
    )
  }

  ionViewWillEnter() {
    if (this.authService.isLoggedIn) {
      this.user = JSON.parse(localStorage.getItem('user'))
      this.userData = JSON.parse(localStorage.getItem('user_data'))
    
      this.authService.getUserData(this.user.uid, this.userData.user_type + 's').then(res => {
        if (res.val().avatar_url) {
          this.avatar = this.sanitizer.bypassSecurityTrustResourceUrl(res.val().avatar_url)
          this.slides.slideTo(1)
          this.alert.presentToast('Você já possui foto de perfil, continue seu cadastro.')
        }
      })
    }
  }

  fetchCities(stateId: number): Observable<any[]> {
    return this.location.getCitiesByState(stateId)
  }

  onStateChange(event): void {
    const stateId: number = event.detail.value
    this.fetchCities(stateId).subscribe((cities: any[]) => this.cities = cities)
    this.candidateForm.get('city_id').setValue(null)
  }
  
  fetchStateAndCity() {
    this.location.getStateById(this.candidateForm.get('state_id').value).subscribe(
      data => {
        this.state = data[0]
        console.log(this.state)
      },
      error => this.alert.presentToast(error.message, 'bottom', 'danger')
    )
    
    this.location.getCityById(this.candidateForm.get('city_id').value).subscribe(
      data => this.city = data[0],
      error => this.alert.presentToast(error.message, 'bottom', 'danger')
    )

    this.nextPage()
  }

  nextPage() {
    this.slides.slideNext()
  }

  goToInit() {
    this.slides.slideTo(1)
  }


  saveData() {
    this.loadingService.presentLoadingDefault()
    this.authService.updateUserData(this.user.uid, this.userData.user_type, this.candidateForm.value)
      .then(res => {
        console.log(res)
        this.authService.updateUserData(this.user.uid, this.userData.user_type, { profile_updated: true })
        this.loadingControl.dismiss()
        this.alert.presentToast('Usuário atualizado com sucesso.')
      })
      .catch(error => {
        console.log(error)
        this.loadingControl.dismiss()
        this.alert.presentToast(error, 'bottom', 'danger')
      })
  }

  async chooseSource(): Promise<void> {
    const actionSheet = await this.actionSheet.create({
      header: 'De onde pegar a imagem?',
      buttons: [
        {
          text: 'Câmera',
          icon: 'camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA)
          }
        },
        {
          text: 'Galeria',
          icon: 'albums',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY)
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    })

    actionSheet.present()
  }

  async takePicture(pictureSourceType: PictureSourceType): Promise<void> {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: pictureSourceType,
    }

    await this.camera.getPicture(options).then((imagedata) => {

      this.crop.crop(imagedata, { quality: 80 }).then(newImageData => {
        this.avatarUrl = newImageData
        const newPathUrl = this.webview.convertFileSrc(newImageData)
        this.avatar = this.sanitizer.bypassSecurityTrustResourceUrl(newPathUrl)
      }, () => {
        this.alert.presentToast('Falha ao cortar a imagem, tente novamente.')
      })
    },
    () => {
      this.alert.presentToast('Erro ao selecionar/tirar foto.', 'bottom', 'danger')
    })
  }

  convertImagePathToBlob(imagePath: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      this.file.resolveLocalFilesystemUrl(imagePath).then((fileEntry: FileEntry) => {
        fileEntry.file(file => {
          const reader = new FileReader()
          const onLoadEnd = function (event) {
            const imgBlob: Blob = new Blob([event.target.result], {type: 'image/jpeg'})
            resolve(imgBlob)
          }
          const onLoadError = function (error) {
            reject(error)
          }
          reader.onloadend = onLoadEnd;
          reader.onerror = onLoadError;
          reader.readAsArrayBuffer(file)
        }, error => {
          reject(error)
        })
      }).catch(error => {
        reject(error)
      })
    })
  }

  async uploadImage() {

    if (this.avatarUrl) {
      const avatarBlob = await this.convertImagePathToBlob(this.avatarUrl)
      const userUid = localStorage.getItem('user_uid')

      const uploadTask = this.storage.upload(
        `files/candidates/profile_photos/${userUid}`,
        avatarBlob
      )

      uploadTask.percentageChanges().subscribe(change => {
        this.uploadProgress = change
      })

      uploadTask.then(async res => {
        const avatarRef = this.storage.ref(`/files/${this.userData.user_type}s/profile_photos/${this.user.uid}`)
          avatarRef.getDownloadURL().subscribe(url => {
            this.authService.updateUserData(this.user.uid, this.userData.user_type, { avatar_url: url })
          })
        this.uploadFinalized = true
        await this.alert.presentToast('Upload de imagem finalizado.', 'bottom', 'success')
      })

    }

  }

}
