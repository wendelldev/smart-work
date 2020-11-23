import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, PopoverController } from '@ionic/angular';
import { FilterSubscriptionsPopoverComponent } from 'src/app/components/filter-subscriptions-popover/filter-subscriptions-popover.component';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.page.html',
  styleUrls: ['./subscriptions.page.scss'],
})
export class SubscriptionsPage implements OnInit {

  subscriptions: any
  subscriptionsKeys = null

  display_subscriptions = []

  on_hold_list = []
  rejected_list = []
  approved_list = []

  message: string = 'Não há nenhuma vaga em análise!'
  list_reference: string = 'Vagas em análise'
  isLoading = false

  filter_value: string = 'on_hold'

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private popoverController: PopoverController
  ) {
    this.isLoading = true
    this.activatedRoute.queryParams.subscribe(async params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.subscriptions = this.router.getCurrentNavigation().extras.state.subscriptions
        const vacancyId = this.router.getCurrentNavigation().extras.state.vacancyId
        this.subscriptionsKeys = Object.keys(this.subscriptions)

        for (let key of this.subscriptionsKeys) {
          if (this.subscriptions[key].status === 'rejected') {
            this.subscriptions[key].id = key
            this.subscriptions[key].vacancy_id = vacancyId
            this.rejected_list.push(this.subscriptions[key])
          } else if (this.subscriptions[key].status === 'approved') {
            this.subscriptions[key].id = key
            this.approved_list.push(this.subscriptions[key])
            this.subscriptions[key].vacancy_id = vacancyId
          } else {
            this.subscriptions[key].id = key
            this.on_hold_list.push(this.subscriptions[key])
            this.subscriptions[key].vacancy_id = vacancyId
          }
        }
        this.filterSubscriptions(this.filter_value)
        this.isLoading = false
      }
    })
  }

  ngOnInit() {
  }

  filterSubscriptions(filter: string) {
    switch (filter) {
      case 'on_hold':
        this.display_subscriptions = this.on_hold_list
        this.message = 'Não há nenhum currículo em análise!'
        this.list_reference = 'Currículos em análise'
        break
      case 'rejected':
        this.display_subscriptions = this.rejected_list
        this.message = 'Não há currículos rejeitados!'
        this.list_reference = 'Currículos rejeitados'
        break
      case 'approved':
        this.display_subscriptions = this.approved_list
        this.message = 'Não há currículos aprovados!'
        this.list_reference = 'Currículos aprovados'
        break
  
    }
  }

  async presentPopover(event: any) {
    const popover = await this.popoverController.create({
      component: FilterSubscriptionsPopoverComponent,
      cssClass: 'filter_popover',
      event: event,
      translucent: true,
      componentProps: {
        "filter_value": this.filter_value
      }
    })

    popover.onDidDismiss().then((data) => {
      this.filter_value = data.data
      this.filterSubscriptions(data.data)
    })

    await popover.present()
  }

}
