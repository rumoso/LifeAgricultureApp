import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ComponentsModule ]
})
export class StartPage implements OnInit {

  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor(
    private authServ: AuthService
  ) {
    this.authServ.validaToken();
    
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  public cerrarSesion(){
    this.authServ.cerrarSesion();
  }

}