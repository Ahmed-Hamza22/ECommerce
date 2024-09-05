import { Component } from '@angular/core';
import { NavMainComponent } from "../../components/nav-main/nav-main.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavMainComponent, RouterOutlet, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
