import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Selection card component used to select a functionality and open the relative detail page
 */
@Injectable()
@Component({
  selector: 'app-selection-card',
  templateUrl: './selection-card.component.html',
  styleUrls: ['./selection-card.component.scss'],
})
export class SelectionCardComponent implements OnInit {

  @Input() icon: string;
  @Input() title: string;
  @Input() linkedPage: string;
  @Input() badge: boolean;
  @Input() value: number;

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  cardClick() {
    this.router.navigate([this.linkedPage]);
  }

}
