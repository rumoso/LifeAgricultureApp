import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getUnidadesMedidaList } from '../interfaces/unidadMedida.intrefaces';

@Injectable({
  providedIn: 'root'
})
export class UnidadmedidaService {

  private baseURL: string = environment.baseUrl;

  _api: string = 'api/unidadmedida';

  constructor( private http: HttpClient ) { }

  public getUnidadesMedida(): Observable<getUnidadesMedidaList>{

    return this.http.post<getUnidadesMedidaList>(`${ this.baseURL }/${ this._api }/getUnidadesMedida`,{});
  }
}
