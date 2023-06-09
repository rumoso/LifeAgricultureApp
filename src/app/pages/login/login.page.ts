import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';
import { ResponseGet } from 'src/app/interfaces/general.interfaces';

import { IonicStorageModule } from '@ionic/storage-angular';
import { SqliteService } from 'src/app/services/sqlite.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, IonicStorageModule]
})
export class LoginPage implements OnInit {

  public login = {
    username: 'Enrique',
    pwd: '123456',
  };

  constructor( 
    private uiServ: UiService
    , private navCtrl: NavController
    , private sqliteServ: SqliteService
    , private authServ: AuthService
   ) {
    this.authServ.validaToken();
    }

  async ngOnInit() {
  }

  public async loginON() {

    const loading = this.uiServ.showLoading('Cargando...');

    await this.authServ.login(this.login.username, this.login.pwd)
    .subscribe({
      next: async( resp: ResponseGet ) => {

        if(resp.status == 0){
          await this.authServ.saveToken( resp.data.token );
          await this.sqliteServ.set('user', resp.data.user);
          this.navCtrl.navigateRoot( '/start', { animated: true } );
          this.uiServ.showToast('Usuario correcto');
        }
        else{
          this.uiServ.showToast(resp.message);
        }
        this.uiServ.hideLoading( await loading );
      },
      error: async( ex: ResponseGet ) => {
        this.uiServ.showToast(ex.message);
        this.uiServ.hideLoading( await loading );
      },
      complete: async() => {
      }
    });
  }

  

}
