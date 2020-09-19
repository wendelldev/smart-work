import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: any

  constructor(
    private angularFireStore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private database: AngularFireDatabase
  ) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user
        localStorage.setItem('user', JSON.stringify(this.userData))
        JSON.parse(localStorage.getItem('user'))
      } else {
        localStorage.setItem('user', null)
        JSON.parse(localStorage.getItem('user'))
      }
    })
  }

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

  getUserData(userId: string, type: string) {
    return this.database.database.ref(`/${type}/` + userId).once('value')
  }

  SignOut() {
    return this.angularFireAuth.signOut()
  }

}
