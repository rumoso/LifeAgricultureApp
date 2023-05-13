import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { InventaryCat } from 'src/app/interfaces/inventarioCat.interfaces';
import { ProductsService } from 'src/app/services/products.service';
import { UiService } from 'src/app/services/ui.service';
import { GetProductsList, getProductsListWithPage } from 'src/app/interfaces/products.interfaces';
import { InventaryService } from 'src/app/services/inventary.service';
import { Pagination, ResponseDB_CRUD } from 'src/app/interfaces/general.interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-invetary',
  templateUrl: './invetary.page.html',
  styleUrls: ['./invetary.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ComponentsModule]
})
export class InvetaryPage implements OnInit {

  inventaryCat: InventaryCat = {
    idUser: 1,
    idMovimiento:     "1",
    idProduct:        0,
    cantidad:         0,
    description:      ''
  }

  productsList: getProductsListWithPage[] = [];

  pagination: Pagination = {
    search: "",
    iRows: 0,
    start: 0,
    limiter: 1000
  }

  constructor(
    private productsServ: ProductsService
    , private inventaryServ: InventaryService
    , private uiService: UiService
    , private authServ: AuthService
  ) {
    this.authServ.validaToken();
   }

  ngOnInit() {
    this.getProductsListWithPage('');
  }

  public async getProductsListWithPage( search: string ){

    const loading = this.uiService.showLoading('Cargando...');

    this.productsServ.getProductsListWithPage(this.pagination)
    .subscribe({
      next: async( resp: GetProductsList ) => {
        this.productsList = resp.data.rows;
      },
      error: async( ex: any ) => {
        this.uiService.showToast('Error al conectarse al servidor');
        this.uiService.hideLoading( await loading );
      },
      complete: async() => {
        this.uiService.hideLoading( await loading );
      }
    });

  }

  public async insertInventary(){
    console.log(this.inventaryCat);

    this.inventaryServ.insertInventary( this.inventaryCat )
    .subscribe({
      next: async( resp: ResponseDB_CRUD ) => {

        if(resp.status == 0){
          this.uiService.showToast(resp.message);
          this.clearCat();
        }
        else{
          this.uiService.showToast(resp.message);
        }
      },
      error: async( ex: any ) => {
        this.uiService.showToast('Error al conectarse al servidor');
      },
      complete: async() => {
      }
    });

  }

  public clearCat(){
    this.inventaryCat = {
      idUser:     1,
      idMovimiento:     "1",
      idProduct:        0,
      cantidad:         0,
      description:      ''
    }
  }

}
