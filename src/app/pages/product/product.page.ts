import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { GetInventaryByIDProductListWithPage, GetProductByID, ProductCat, getInventaryByIdProduct } from 'src/app/interfaces/products.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ParamID, ResponseDB_CRUD } from 'src/app/interfaces/general.interfaces';
import { UiService } from 'src/app/services/ui.service';
import { UnidadmedidaService } from 'src/app/services/unidadmedida.service';
import { getUnidadesMedidaList, unidadMedida } from 'src/app/interfaces/unidadMedida.intrefaces';
import { ProductsService } from 'src/app/services/products.service';
import { InventaryService } from 'src/app/services/inventary.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ComponentsModule]
})
export class ProductPage implements OnInit {

  id: number = 0!;

  unidadMedidaList: unidadMedida[] | undefined;

  OGetInventaryByIDProductListWithPage: getInventaryByIdProduct[] | undefined;

  product: ProductCat = {
    idProduct: 0,
    name: '',
    precio: 0,
    idUnidadMedida: "",
    UMSiglas: '',
    UMDesc: ''
  };
  
  constructor(
    private navCtrl: NavController,
    private router: Router,
    private activatedRoute: ActivatedRoute
    , private uiService: UiService
    , private uMService: UnidadmedidaService
    , private productsService: ProductsService
    , private alertController: AlertController
    , private inventaryServ: InventaryService
    , private authServ: AuthService
  ) { 
    this.authServ.validaToken();
  }

  getStatesName(event:any) {
  }

  async ngOnInit() {
    
    const loading = this.uiService.showLoading('Cargando...');
    
    await this.getUnidadesMedida();

    await this.activatedRoute.queryParams.subscribe
    ({
      next: async( resp: any ) => {
        if(resp.id > 0){
          this.product.idProduct = resp.id;
          await this.getProductByID();
        }
      },
      error: async( ex: any ) => {
        this.uiService.showToast('Error al conectarse al servidor');
      }
    });
    

    this.uiService.hideLoading( await loading );
  }

  public async getUnidadesMedida(){
    console.log('fuera: getUnidadesMedida')
    await this.uMService.getUnidadesMedida()
    .subscribe({
      next: async( resp: getUnidadesMedidaList ) => {
        //console.log(resp)
        this.unidadMedidaList = resp.data.rows;
      },
      error: async( ex: any ) => {
        this.uiService.showToast('Error al conectarse al servidor');
      },
      complete: async() => {
        console.log('Complete: getUnidadesMedida')
      }
    });

  }

  public async saveProduct(){
    console.log(this.product);

    if(this.product.idProduct == 0){
      
      this.productsService.insertProduct( this.product )
      .subscribe({
        next: async( resp: ResponseDB_CRUD ) => {
  
          if(resp.status == 0){
            this.uiService.showToast(resp.message);
            this.backProductList();
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

    }else{
      this.productsService.updateProduct( this.product )
      .subscribe({
        next: async( resp: ResponseDB_CRUD ) => {
  
          if(resp.status == 0){
            this.uiService.showToast(resp.message);
            this.backProductList();
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

    


  }

  public async DeleteProduct(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirma!',
      message: '¿Quieres eliminar el producto?',
      buttons: [
         {
          text: 'Si',
          handler: async () => {
            
            const loading = this.uiService.showLoading('Cargando...');

            this.productsService.deleteProduct( this.product.idProduct )
            .subscribe({
              next: async( resp: ResponseDB_CRUD ) => {
        
                if(resp.status == 0){
                  this.uiService.showToast(resp.message);
                  this.backProductList();
                }
                else{
                  this.uiService.showToast(resp.message);
                }
              },
              error: async( ex: any ) => {
                this.uiService.showToast('Error al conectarse al servidor');
                this.uiService.hideLoading( await loading );
              },
              complete: async() => {
                this.uiService.hideLoading( await loading );
              }
            });

          },
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();

  }

  public backProductList(){
    this.navCtrl.navigateRoot('/product-list',{animated: true});
  }

  public async getProductByID(){
    console.log('fuera: getProductByID')
    await this.productsService.getProductByID( this.product.idProduct )
    .subscribe({
      next: async( resp: GetProductByID ) => {
        this.product = resp.data[0];
        this.product.idUnidadMedida = String(resp.data[0].idUnidadMedida) ;
        this.AGetInventaryByIDProductListWithPage();
      },
      error: async( ex: any ) => {
        this.uiService.showToast('Error al conectarse al servidor');
      },
      complete: async() => {
        console.log('complete: getProductByID')
      }
    });


  }

  public async AGetInventaryByIDProductListWithPage(  ){

    const loading = this.uiService.showLoading('Cargando...');

    this.inventaryServ.getInventaryByIDProductListWithPage( this.product.idProduct )
    .subscribe({
      next: async( resp: GetInventaryByIDProductListWithPage ) => {
        console.log(resp.data.rows)
        this.OGetInventaryByIDProductListWithPage = resp.data.rows;
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

  

}
