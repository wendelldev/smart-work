import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.page.html',
  styleUrls: ['./subscriptions.page.scss'],
})
export class SubscriptionsPage implements OnInit {

  subscriptions: any
  subscriptionsKeys = null

  isLoading = false

  constructor(
    private loadingControl: LoadingController,
    private loadingService: LoadingService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.isLoading = true
    this.activatedRoute.queryParams.subscribe(async params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.subscriptions = this.router.getCurrentNavigation().extras.state.subscriptions
        this.subscriptionsKeys = Object.keys(this.subscriptions)

        this.isLoading = false
      }
    })
  }

  ngOnInit() {
  }

}
