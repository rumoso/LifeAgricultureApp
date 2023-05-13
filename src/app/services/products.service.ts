import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetProductByID, GetProductsList, ProductCat } from '../interfaces/products.interfaces';
import { Observable } from 'rxjs';
import { Pagination, ResponseDB_CRUD } from '../interfaces/general.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseURL: string = environment.baseUrl;

  _api: string = 'api/products';

  constructor( private http: HttpClient ) { }

  public getProductsListWithPage(pagination: Pagination): Observable<GetProductsList>{
    const data = {
      search: pagination.search
      ,start: pagination.start
      ,limiter: pagination.limiter
    };

    return this.http.post<GetProductsList>(`${ this.baseURL }/${ this._api }/getProductsListWithPage`,data);
  }

  public getProductByID(id: number): Observable<GetProductByID>{
    const data = {
      id
    };

    return this.http.post<GetProductByID>(`${ this.baseURL }/${ this._api }/getProductByID`,data);
  }

  public insertProduct(data: ProductCat): Observable<ResponseDB_CRUD>{

    return this.http.post<ResponseDB_CRUD>(`${ this.baseURL }/${ this._api }/insertProduct`,data);
  }

  public updateProduct(data: ProductCat): Observable<ResponseDB_CRUD>{

    return this.http.post<ResponseDB_CRUD>(`${ this.baseURL }/${ this._api }/updateProduct`,data);
  }

  public deleteProduct(idProduct: number): Observable<ResponseDB_CRUD>{
    const data = {
      idProduct
    };
    return this.http.post<ResponseDB_CRUD>(`${ this.baseURL }/${ this._api }/deleteProduct`,data);
  }

}
