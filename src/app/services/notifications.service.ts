import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';
import { VacanciesService } from './vacancies.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private database: AngularFireDatabase,
    private storage: Storage,
    private vacanciesService: VacanciesService
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

  sendInterviewNotification(data: any, subscriptions: any, subscriptionsKeys: any) {
    const notificationData = data

    this.storage.get('user_data').then(async data => {

      const vacancy_id = subscriptions[subscriptionsKeys[0]].vacancy_id
      this.vacanciesService.getVacancyById(vacancy_id)
        .then(data => {
          const vacancyData = data.val()[vacancy_id]
          notificationData.vacancy = vacancyData
          for (let key of subscriptionsKeys) {
            this.database.database.ref(`candidates/${subscriptions[key].uid}/notifications`)
              .push(notificationData)
          }
        })
    })
  }

  getNotifications(userId: string) {
    return this.database.list(`candidates/${userId}/notifications`).query.once('value')
  }
}
