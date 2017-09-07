import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OnInit } from 'angular2/core';

import { PreferService } from '../../providers/prefer-service';


@Component({
  templateUrl: 'prefer.component.html'
})
export class PreferComponent {

  prefer = {id: 0};
  vote = false;
  total_vote = 0;

  constructor(public navCtrl: NavController,
              private preferService: PreferService,
              private navParams: NavParams) {

  }

  getPreferRandom(): void {
    this.vote = false;
    this.preferService
      .getPreferRandomByCategory(this.navParams.get('id'))
      .subscribe((prefer: any) => {
        this.prefer = prefer;
        this.total_vote = prefer.second_vote + prefer.first_vote;
        console.log(this.total_vote);
        console.log(prefer);
      }, (err: any) => {
        console.log(err);
        this.prefer = null;
      }, () => console.log('Done'));
  }

  setPrefer(choice: number) {
    if(!this.vote) {
      this.preferService
        .setPrefer(choice, this.prefer.id).subscribe(
        (data) => {
          this.vote = true;
        }
      );
    }
    else {
      this.getPreferRandom();
    }
  }



  d
  ngOnInit() {
    this.getPreferRandom();
  }

}
