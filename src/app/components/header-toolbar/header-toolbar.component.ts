import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss'],
})
export class HeaderToolbarComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {}

}
