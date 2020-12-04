import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss'],
})
export class NotificationCardComponent implements OnInit {

  @Input() notification: any
  @Input() userData: any = null

  constructor() {
    console.log(this.notification)
  }

  ngOnInit() {}

  formatDate(dateTime: string) {
    moment.locale('pt-br')
    let date = moment(dateTime).format('DD/MM/YYYY')

    return date
  }

  formatTime(timeStr: string) {
    moment.locale('pt-br')
    let time = moment(timeStr).format('h:mm a')

    return time
  }

}
