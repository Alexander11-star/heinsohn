import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { pedidoI, clienteI, productoI, categoriaI} from '../models/pedido.model';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    url:string = "https://localhost:44366/api/"

  constructor(private http:HttpClient) { }

    //Lista de CLientes
    getCliente(){
        let direccion = this.url + "cliente"
        return this.http.get(direccion);
    }
 
    //Lista de Categorias
    getCategoria(){
        let direccion = this.url + "categoria"
        return this.http.get(direccion);
    }

    //Lista de Productos
    getProducto(){
        let direccion = this.url + "producto"
        return this.http.get(direccion);
    }

    //Lista de Pedidos
    getPedido(){
        let direccion = this.url + "Pedido"
        return this.http.get(direccion);
    }

    //Registro del usuario
    setPedido(json: pedidoI){
        let direccion = this.url + "pedido"
        return this.http.post(direccion,json);
    }

    setModPedido(json: pedidoI){
        let direccion = json.idPedido;
        return this.http.put(`https://localhost:44366/api/pedido/${direccion}`,json);
    }

    //Registro del usuario
    deletePedido(idpedido: number){
        return this.http.delete(`https://localhost:44366/api/pedido/${idpedido}`);
    }

    getProductForId(idproducto: number){
        return this.http.get(`https://localhost:44366/api/producto/${idproducto}`);
    }

    getPedidoForclient(idcliente: number){
        return this.http.get(`https://localhost:44366/api/pedido/${idcliente}`);
    }

    getPedidoModify(idPedido: number){
        return this.http.get(`https://localhost:44366/api/pedido/getid/${idPedido}`);
    }
        
    /*
    getItem(idItem:number){
        return this.http.get(`https://subastaloapi.azurewebsites.net/api/Producto/GetProductById/${idItem}`);
    }
    */
}