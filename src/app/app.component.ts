import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-base';
  isShowMenu: boolean = false;
  isShowDrop: boolean = false;

  showMenu(){
    this.isShowMenu = !this.isShowMenu;
  }

  drop(){
    this.isShowDrop = !this.isShowDrop;
  }
}
