import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacanciesService {

  constructor(
    private database: AngularFireDatabase,
    private storage: Storage
  ) { }

  private getRandomId() {
    var randomized = Math.ceil(Math.random() * Math.pow(10, 6))
    let digit = Math.ceil(Math.log(randomized))

    while (digit > 10) {
      digit = Math.ceil(Math.log(digit))
    }

    let id = randomized + '-' + digit
    return id
  }

  registerVacancy(vacancyData: any) {

    vacancyData.id = this.getRandomId()

    this.database.list('vacancies/')
      .set(vacancyData.id, vacancyData)
  }

  getAllVacancies() {
    return this.database.list('vacancies').query.once('value')
  }

  getVacancyById(id: string) {
    return this.database.list('vacancies')
      .query
      .orderByChild('id')
      .equalTo(id)
      .once('value')
  }

  getVacanciesBySearch(param: string, search: string) {
    return this.database.database.ref('vacancies')
      .orderByChild(param)
        .startAt(search)
        .endAt(search+'\uf8ff')
        .once('value')
  }

  getContractorVacancies(contractorId: string) {
    return this.database.database.ref('vacancies')
      .orderByChild('contractor_uid').equalTo(contractorId).once('value')
  }

  addVacanciesToStorage(vacancies: any) {
    this.storage.set('vacancies', vacancies)
  }

  updateVacancy(vacancyId: string, vacancyData: any) {
    return this.database.list('vacancies/').update(vacancyId, vacancyData)
  }

  subscribeToVacancy(vacancyId: string, candidateData: any) {
    return this.database.database.ref(`vacancies/${vacancyId}/subscriptions`)
      .push(candidateData)
  }

  changeSubscriptionStatus(vacancyId: string, subscriptionId: string, newSub: any) {
    return this.database.list(`vacancies/${vacancyId}/subscriptions/`)
      .update(subscriptionId, newSub)
  }
}
