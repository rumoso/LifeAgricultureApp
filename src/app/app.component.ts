import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: 'start', icon: 'home' },
    { title: 'Ventas', url: 'sale-list', icon: 'cash' },
    { title: 'Productos', url: 'product-list', icon: 'bag-handle' },
    { title: 'Inventario', url: 'invetary', icon: 'cube' },
  ];
  constructor(
    private authServ: AuthService
  ) {}
}