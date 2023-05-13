export interface getUnidadesMedidaList {
    status:  number;
    message: string;
    data:    DataList;
}

export interface DataList {
    count: number;
    rows:  unidadMedida[];
}

export interface unidadMedida {
    idUnidadMedida:     number;
    createDate:    Date;
    desc:          string;
    siglas:        number;
    active:        number;
}