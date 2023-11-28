import { Component } from '@angular/core';
import { HomeHeaderComponent } from '../home-header/home-header.component';
import { HomeContentComponent } from '../home-content/home-content.component';
import { HomeFooterComponent } from '../home-footer/home-footer.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(){
    localStorage.setItem("isLoggedin","false");
  }

}
