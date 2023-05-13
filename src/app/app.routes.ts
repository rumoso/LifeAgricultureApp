import { Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'start',
    loadComponent: () => import('./pages/start/start.page').then( m => m.StartPage),
  },
  {
    path: 'sale-list',
    loadComponent: () => import('./pages/sale-list/sale-list.page').then( m => m.SaleListPage)
  },
  {
    path: 'sale',
    loadComponent: () => import('./pages/sale/sale.page').then( m => m.SalePage)
  },
  {
    path: 'product',
    loadComponent: () => import('./pages/product/product.page').then( m => m.ProductPage)
  },
  {
    path: 'product-list',
    loadComponent: () => import('./pages/product-list/product-list.page').then( m => m.ProductListPage)
  },
  {
    path: 'invetary',
    loadComponent: () => import('./pages/invetary/invetary.page').then( m => m.InvetaryPage)
  }
];
