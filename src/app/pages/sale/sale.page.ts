import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.page.html',
  styleUrls: ['./sale.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ComponentsModule]
})
export class SalePage implements OnInit {

  constructor(
    private authServ: AuthService
  ) { 
    this.authServ.validaToken();
  }

  ngOnInit() {
  }

}
