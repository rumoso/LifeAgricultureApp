import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseGet } from '../interfaces/general.interfaces';
import { Observable } from 'rxjs';
import { SqliteService } from './sqlite.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = environment.baseUrl;

  _api: string = 'api/auth';

  public token: string = '';

  constructor(
    private http: HttpClient
    , private sqliteServ: SqliteService
    , private navCtrl: NavController
    ) { }

  public login( userName: string, pwd: string): Observable<ResponseGet>{
    const data = {
      username: userName
      ,pwd: pwd
    };

    return this.http.post<ResponseGet>(`${ this.baseURL }/${ this._api }/login` ,data);
  }

  public async saveToken( token: string ) {
    await this.sqliteServ.set('token', token);
    await this.validaToken();
  }

  public async cargarToken() {
    this.token = await this.sqliteServ.get('token') || null;
  }

  public async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if ( !this.token ) {
      this.navCtrl.navigateRoot( '/login' );
      return Promise.resolve(false);
    } else {
      // AQUI DEBERIA VALIDAR EL UUID EN LA BASE DE DATOS
      return Promise.resolve(true);
    }
  }

  public async cerrarSesion() {
    this.token = '';
    await this.sqliteServ.clear();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }
}
