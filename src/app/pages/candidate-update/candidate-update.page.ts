import { Crop } from '@ionic-native/crop/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonSlides } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastService } from 'src/app/services/toast.service';
import { AngularFireStorage } from '@angular/fire/storage'

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
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.candidateForm = this.formBuilder.group({
      photo_url: [null, Validators.required],
      name: [null, [Validators.required, Validators.minLength(5)]],
      residencial_phone: [null, [Validators.minLength(14)]],
      mobile_phone: [null, [Validators.required, Validators.minLength(15)]],
      linkedInUrl: [null],
      state: [null, Validators.required],
      city: [null, Validators.required],
      birthday: [null, [Validators.required, Validators.minLength(10)]],
      occupation: [null, Validators.required],
      scholarity: [null, Validators.required],
      qualifications: [null, Validators.required],
      experience: [null, Validators.required],
      presentation_text: [null, Validators.required]
    })
  }

  nextPage() {
    this.slides.slideNext()
  }

  async sendData() {

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
        this.uploadFinalized = true
        await this.alert.presentToast('Upload de imagem finalizado.', 'bottom', 'success')
      })

    }

  }

}
