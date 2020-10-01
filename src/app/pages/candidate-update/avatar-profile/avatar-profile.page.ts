import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../../../services/authentication.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Crop } from '@ionic-native/crop/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera, PictureSourceType, CameraOptions } from '@ionic-native/camera/ngx';
import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ActionSheetController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { File, FileEntry } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-avatar-profile',
  templateUrl: './avatar-profile.page.html',
  styleUrls: ['../candidate-update.page.scss'],
})
export class AvatarProfilePage implements OnInit {

  avatar: SafeResourceUrl
  avatarUrl: any = null
  uploadProgress = 0
  uploadFinalized: boolean = false

  user: any
  userData: any

  update = false

  constructor(
    private file: File,
    private camera: Camera,
    private webview: WebView,
    private sanitizer: DomSanitizer,
    private crop: Crop,
    private actionSheet: ActionSheetController,
    private alert: ToastService,
    private storage: AngularFireStorage,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private localStorage: Storage
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.user = JSON.parse(await this.localStorage.get('user'))
    this.userData = JSON.parse(await this.localStorage.get('user_data'))

    this.authService.getUserData(this.user.uid, this.userData.user_type + 's').then(res => {
      if (res.val().avatar_url) {
        this.avatar = this.sanitizer.bypassSecurityTrustResourceUrl(res.val().avatar_url)

        this.activatedRoute.queryParams.subscribe(params => {
          if (params) {
            this.update = true
          } else {
            this.router.navigate(['/candidate-update/personal-info'], { replaceUrl: true })
            this.alert.presentToast('Você já possui foto de perfil, continue seu cadastro.')
          }
        })
      }
    })
  }

  nextPage() {
    this.router.navigate(['/candidate-update/personal-info'])
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

      const uploadTask = this.storage.upload(
        `files/candidates/profile_photos/${this.user.uid}`,
        avatarBlob
      )

      uploadTask.percentageChanges().subscribe(change => {
        this.uploadProgress = change
      })

      uploadTask.then(async res => {
        const avatarRef = this.storage.ref(`/files/${this.userData.user_type}s/profile_photos/${this.user.uid}`)
        avatarRef.getDownloadURL().subscribe(url => {
          this.authService.updateUserData(this.user.uid, this.userData.user_type, { avatar_url: url })
          this.userData.avatar_url = url
          this.localStorage.set('user_data', JSON.stringify(this.userData))
        })
        this.uploadFinalized = true
        await this.alert.presentToast('Upload de imagem finalizado.', 'bottom', 'success')
      })

    }

  }

}
