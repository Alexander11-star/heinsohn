export class pedidoI{
    idPedido?: number;
    idProducto?: number;
    idCliente?: number;
    fechaPedido?: string;
    cantidad?: number;
    precio?: number;
    idCategoria?: number;
    comentario?: string;
}

export interface clienteI{
    idCliente?: number;
    nombre?: string;
    telefono?: number;
    direccion?: string;
    barrio?: string;
    ciudad?: string;
    departamento?: string;
}

export interface productoI{
    idProducto?: number;
    nombreProducto?: string;
    precio?: number;
    idCategoria?: number;
}

export interface categoriaI{
    idCategoria?: number;
    nombreCategoria?: string;
}