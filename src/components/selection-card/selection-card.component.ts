import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionCard } from 'src/models/selection-card';

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

  selectionCard: SelectionCard = new SelectionCard();

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    this.selectionCard = { icon: this.icon, title: this.title, linkedPage: this.linkedPage };
  }

  cardClick() {
    this.router.navigate([this.selectionCard.linkedPage]);
  }

}
