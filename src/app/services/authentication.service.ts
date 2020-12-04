import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private database: AngularFireDatabase,
    private storage: Storage
  ) { }

  SignIn(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
  }

  registerUser(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
  }

  PasswordRecover(passwordResetEmail: string) {
    return this.angularFireAuth.sendPasswordResetEmail(passwordResetEmail)
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false
  }

  SetUserData(res: any, userType: string) {
    if (userType === 'contractor') {
      this.database.list('contractors/')
        .set(res.user.uid, {
          uid: res.user.uid,
          email: res.user.email,
          user_type: userType
        })
    } else {
      this.database.list('candidates/')
        .set(res.user.uid, {
          uid: res.user.uid,
          email: res.user.email,
          user_type: userType
        })
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.storage.get('user_data')
    return !!user
  }

  logout() {
    return this.angularFireAuth.signOut()
  }

  removeUserDataFromStorage() {
    this.storage.remove('user_data')
    this.storage.remove('user_type')
  }

  updateUserData(userId: string, userType: string, data: any) {
    return this.database.list(`${userType}s/`).update(userId, data)
  }

  getUserData(userId: string, type: string) {
    return this.database.database.ref(`/${type}/` + userId).once('value')
  }

  SignOut() {
    return this.angularFireAuth.signOut()
  }

}
