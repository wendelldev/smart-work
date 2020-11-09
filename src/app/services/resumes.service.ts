import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ResumesService {

  constructor(
    private database: AngularFireDatabase,
    private storage: Storage
  ) { }

  getAllResumes() {
    return this.database.list('candidates').query.once('value')
  }

  getResumeById(uid: string) {
    return this.database.list('candidates')
      .query.orderByChild('uid')
      .equalTo(uid)
      .once('value')
  }
}
