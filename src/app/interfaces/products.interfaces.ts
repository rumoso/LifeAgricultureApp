export interface GetProductsList {
    status:  number;
    message: string;
    data:    DataList;
}

export interface DataList {
    count: number;
    rows:  getProductsListWithPage[];
}

export interface getProductsListWithPage {
    idProduct:     number;
    createDate:    Date;
    updateDate:    Date;
    name:          string;
    precio:        number;
    cantidad:        number;
    UMDesc:        string;
    UMSiglas:      string;
}

export interface ProductCat {
    idProduct:     number;
    name:          string;
    precio:        number;
    idUnidadMedida:string;
    UMDesc:        string;
    UMSiglas:      string;
}

export interface GetProductByID {
    status:  number;
    message: string;
    data:    ProductCat[];
}

export interface GetProductByIDData {
    idProduct:     number;
    createDate:    Date;
    updateDate:    Date;
    name:          string;
    precio:        number;
    UMDesc:        string;
    UMSiglas:      string;
}

export interface GetInventaryByIDProductListWithPage {
    status:  number;
    message: string;
    data:    DataListGetInventary;
}

export interface DataListGetInventary {
    count: number;
    rows:  getInventaryByIdProduct[];
}

export interface getInventaryByIdProduct {
    iRows:        number;
    createDate:   Date;
    idUser:       number;
    userName:     string;
    idMovimiento: number;
    movName:      string;
    idProduct:    number;
    productName:  string;
    cantidad:     number;
    description:  string;
}
