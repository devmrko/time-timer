import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';

import { interval, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Food {
  value: string;
  viewValue: string;
}

export interface Minute {
  code: number;
  value: number;
}

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.css']
})
export class ConditionComponent implements OnInit, OnDestroy {

  setTime = 0;
  remainedMin = 0;
  startBool = false;
  startOver = false;
  minVal;

  TOTAL_TIME = 60 * 60;

  change: EventEmitter<number> = new EventEmitter();

  // ADD CHART OPTIONS.
  pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false
  };

  pieChartLabels = ['time', '', ''];

  // CHART COLOR.
  pieChartColor: any = [
    {
      backgroundColor: ['rgb(255, 0, 0)',
        'rgb(234, 186, 187)',
        'rgb(46, 66, 87)'
      ]
    }
  ];

  pieChartData: any = [
    {
      data: [0, 0, this.TOTAL_TIME]
    }
  ];

  constructor() { }

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  minute: Minute[] = [];

  ngOnInit() {

    for (let i = 1; i < 61; i++) {
      this.minute.push({ code: i, value: i });
    }

    const self = this;

    this.change.subscribe(() => {
      if (self.startBool) {
        if (this.remainedMin > 0) {
          self.remainedMin = self.remainedMin - 1;
          self.pieChartData = [
            { data: [self.remainedMin, this.setTime - self.remainedMin, self.TOTAL_TIME - this.setTime] }
          ];
        } else if (this.remainedMin === 0) {
          self.startBool = false;
          alert('time is up!');
        }
      }
    });

    setInterval(() => {
      if (this.remainedMin >= 0) {
        this.change.emit();
      }
    }, 1000);

  }

  start() {
    if (this.minVal === undefined) {
      alert('please, select minute!');
    } else {
      console.dir('start!');
      if (this.startOver || this.remainedMin === 0) {
        this.remainedMin = this.minVal * 60;
        this.setTime = this.remainedMin;
        this.startOver = false;
      }
      this.startBool = true;
    }
  }

  stop() {
    console.dir('stop!');
    this.startBool = false;
  }

  minChange() {
    this.startOver = true;
  }

  ngOnDestroy() {

  }

}
