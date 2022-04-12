import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from 'src/app/shared/menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  items = MENU_ITEMS;

  constructor() { }

  ngOnInit(): void {
  }

}
