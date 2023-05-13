import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
  })
  export class UsuarioGuard implements CanLoad {
  
    constructor( private authServ: AuthService) {}
  
    public canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authServ.validaToken();
    }
  
  }
  